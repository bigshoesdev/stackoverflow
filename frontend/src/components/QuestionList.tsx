import React from "react";
import QuestionItem from "./QuestionItem";
import { Question } from "../types";

interface QuestionListProps {
  questions: Question[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <div className="space-y-4">
      {questions.length > 0 ? (
        questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default QuestionList;
