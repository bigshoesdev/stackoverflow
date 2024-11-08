import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchUserQuestions } from "../services/api";

interface QuestionState {
  questions: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: QuestionState = {
  questions: [],
  status: "idle",
};

export const fetchUserQuestions = createAsyncThunk(
  "fetchUserQuestions",
  async (userId: string) => {
    return await searchUserQuestions(userId);
  }
);

const userQuestionsSlice = createSlice({
  name: "userQuestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchUserQuestions.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userQuestionsSlice.reducer;
