import path from "path";
import sequelize from "@db/db";
import { readJsonFile } from ".";
import elasticClient from "@db/elasticsearch";

import { User, Question, Answer, Comment } from "@models/index";
import { QUESTION_INDEX_NAME } from "@config/index";

const jsonFilePath = path.join(__dirname, "../../data/stackoverflow.json");

const getUserOrCreate = async (id: number, name: string) => {
  return (
    (await User.findByPk(id)) ||
    (await User.create({
      id,
      name,
    }))
  );
};

const feedDB = async () => {
  const jsonData = readJsonFile(jsonFilePath);

  try {
    for (const questionData of jsonData) {
      const user = await getUserOrCreate(
        questionData.user.id,
        questionData.user.name
      );

      const question = await Question.create({
        id: questionData.id,
        title: questionData.title,
        body: questionData.body,
        creationDate: new Date(questionData.creation * 1000),
        score: questionData.score,
        userId: user.id,
      });

      for (const commentData of questionData.comments) {
        const commentUser = await getUserOrCreate(
          commentData.user.id,
          commentData.user.name
        );

        await Comment.create({
          id: commentData.id,
          body: commentData.body,
          creationDate: new Date(),
          userId: commentUser.id,
          questionId: question.id,
        });
      }

      for (const answerData of questionData.answers) {
        const answerUser = await getUserOrCreate(
          answerData.user.id,
          answerData.user.name
        );

        const answer = await Answer.create({
          id: answerData.id,
          body: answerData.body,
          creationDate: new Date(answerData.creation * 1000),
          score: answerData.score,
          accepted: answerData.accepted,
          questionId: question.id,
          userId: answerUser.id,
        });

        for (const comment of answerData.comments) {
          const commentUser = await getUserOrCreate(
            comment.user.id,
            comment.user.name
          );

          await Comment.create({
            id: comment.id,
            body: comment.body,
            creatioDate: new Date(),
            userId: commentUser.id,
            answerId: answer.id,
          });
        }
      }
    }

    console.log("DB Data import complete.");
  } catch (error) {
    console.error("Error importing data:", error);
  }
};

const feedElastic = async () => {
  try {
    const indexExists = await elasticClient.indices.exists({
      index: QUESTION_INDEX_NAME,
    });

    indexExists &&
      (await elasticClient.indices.delete({ index: QUESTION_INDEX_NAME }));

    const questions = await Question.findAll({ include: [Answer, User] });

    for (const question of questions) {
      await elasticClient.index({
        index: QUESTION_INDEX_NAME,
        id: question.id.toString(),
        document: {
          id: question.id,
          title: question.title,
          body: question.body,
          user: question.user,
          creationDate: question.creationDate,
        },
      });
    }

    console.log("Elastic index data indexing complete");
  } catch (error) {
    console.error("Error during data indexing:", error);
  } finally {
    await sequelize.close();
  }
};

const runScript = async () => {
  await sequelize.sync({ force: true });

  await feedDB();
  await feedElastic();

  await sequelize.close();
};

runScript();
