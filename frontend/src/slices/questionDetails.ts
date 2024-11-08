import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getQuestionDetails } from "../services/api";
import { Question } from "../types";

interface QuestionDetailsState {
  question: Question | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuestionDetailsState = {
  question: null,
  loading: false,
  error: null,
};

export const fetchQuestionDetails = createAsyncThunk(
  "fetchQuestionDetails",
  async (questionId: string) => {
    return await getQuestionDetails(questionId);
  }
);

const questionDetailsSlice = createSlice({
  name: "questionDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchQuestionDetails.fulfilled,
        (state, action: PayloadAction<Question>) => {
          state.question = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchQuestionDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load question details.";
      });
  },
});

export default questionDetailsSlice.reducer;
