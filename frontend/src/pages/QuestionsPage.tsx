import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchQuestions } from "../slices/questions";
import SearchBar from "../components/SearchBar";
import QuestionList from "../components/QuestionList";

const QuestionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, status } = useSelector(
    (state: RootState) => state.questions
  );

  useEffect(() => {
    dispatch(fetchQuestions(""));
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(fetchQuestions(query));
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && <QuestionList questions={questions} />}
      {status === "failed" && <p>Error fetching results.</p>}
    </div>
  );
};

export default QuestionsPage;
