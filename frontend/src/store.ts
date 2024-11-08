import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./slices/questions";
import questionDetailsReducer from "./slices/questionDetails";
import userQuestionsReducer from "./slices/userQuestions";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    questionDetails: questionDetailsReducer,
    userQuestions: userQuestionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
