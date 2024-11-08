import { Request, Response } from "express";
import { Question, Answer, Comment, User } from "@models/index";
import elasticClient from "@db/elasticsearch";
import { QUESTION_INDEX_NAME } from "@config/index";
import {
  QueryDslQueryContainer,
  SearchResponse,
} from "@elastic/elasticsearch/lib/api/types";

const searchQuestionsWithQuery = async (
  query: QueryDslQueryContainer | undefined
) => {
  const result: SearchResponse<Question> = await elasticClient.search({
    index: QUESTION_INDEX_NAME,
    query,
    size: 100,
  });

  return result.hits.hits.map((hit) => hit._source);
};

export const searchQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { query } = req.query;

  try {
    const searchQuery =
      query && typeof query === "string" && query.trim() !== ""
        ? {
            multi_match: {
              query: query as string,
              fields: ["title", "body"],
            },
          }
        : {
            match_all: {},
          };

    res.json(await searchQuestionsWithQuery(searchQuery));
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const searchUserQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id;

  try {
    res.json(
      await searchQuestionsWithQuery({
        term: {
          "user.id": {
            value: userId,
          },
        },
      })
    );
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getQuestionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const question = await Question.findByPk(req.params.id, {
      attributes: ["id", "title", "body", "creationDate", "score"],
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Answer,
          attributes: ["id", "body", "creationDate", "score", "accepted"],
          include: [
            {
              model: User,
              attributes: ["id", "name"],
            },
            {
              model: Comment,
              attributes: ["id", "body", "creationDate"],
              include: [
                {
                  model: User,
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
        },
        {
          model: Comment,
          attributes: ["id", "body", "creationDate"],
          include: [
            {
              model: User,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ error: "Question not found" });
    }
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
