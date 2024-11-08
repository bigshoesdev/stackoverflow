import { Router } from "express";
import {
  getQuestionById,
  searchQuestions,
  searchUserQuestions,
} from "@controllers/question";

const router = Router();

router.get("/search", searchQuestions);

router.get("/user/:id", searchUserQuestions);

router.get("/:id", getQuestionById);

export default router;
