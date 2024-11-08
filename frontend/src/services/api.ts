import axios from "axios";
import { Question } from "../types";

const API_BASE_URL = "http://localhost:9000";

export const searchQuestions = async (query: string) => {
  const { data } = await axios.get(`${API_BASE_URL}/questions/search`, {
    params: { query },
  });
  return data;
};

export const searchUserQuestions = async (userId: string) => {
  const { data } = await axios.get(`${API_BASE_URL}/questions/user/${userId}`);
  return data;
};

export const getQuestionDetails = async (
  questionId: string
): Promise<Question> => {
  const { data } = await axios.get(`${API_BASE_URL}/questions/${questionId}`);
  return data;
};
