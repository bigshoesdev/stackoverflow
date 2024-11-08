import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import sequelize from "@db/db";
import questions from "@routes/question";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/questions", questions);

const PORT = process.env.PORT || 9000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
