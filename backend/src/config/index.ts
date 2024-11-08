import { Dialect } from "sequelize/types";
import dotenv from "dotenv";

dotenv.config();

interface DBConfig {
  username: string;
  password: string | undefined;
  database: string;
  host: string;
  dialect: Dialect;
}

export const QUESTION_INDEX_NAME = "questions";

export default {
  db: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || "stackoverflow_db",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    dialect: "postgres",
  } as DBConfig,
  server: {
    port: parseInt(process.env.PORT || "3000", 10),
  },
  elasticsearchURL: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
};
