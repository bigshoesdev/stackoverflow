import { Sequelize } from "sequelize-typescript";
import { User, Question, Answer, Comment } from "@models/index";
import config from "@config/index";

const sequelize = new Sequelize({
  ...config.db,
  models: [User, Question, Answer, Comment],
});

export default sequelize;
