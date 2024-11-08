import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchQuestions } from "../services/api";

interface QuestionState {
  questions: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: QuestionState = {
  questions: [],
  status: "idle",
};

export const fetchQuestions = createAsyncThunk(
  "fetchQuestions",
  async (query: string) => {
    return await searchQuestions(query);
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default questionsSlice.reducer;
