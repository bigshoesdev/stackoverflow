import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import QuestionList from "../components/QuestionList";
import { fetchUserQuestions } from "../slices/userQuestions";

const UserQuestionsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { questions, status } = useSelector(
    (state: RootState) => state.userQuestions
  );

  useEffect(() => {
    dispatch(fetchUserQuestions(userId || ""));
  }, [dispatch, userId]);

  return (
    <div className="p-4">
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && <QuestionList questions={questions} />}
      {status === "failed" && <p>Error fetching results.</p>}
    </div>
  );
};

export default UserQuestionsPage;
