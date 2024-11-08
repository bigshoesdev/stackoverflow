import React from "react";
import { Question } from "../types";
import { Link } from "react-router-dom";

interface QuestionItemProps {
  question: Question;
}

const TRUNCATE_LENGTH = 300;

const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
  const bodySnippet =
    question.body.length > TRUNCATE_LENGTH
      ? question.body.substring(0, TRUNCATE_LENGTH) + "..."
      : question.body;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <Link to={`/questions/${question.id}`}>
        <h2 className="text-lg capitalize font-bold text-blue-700 hover:underline cursor-pointer">
          {question.title}
        </h2>
      </Link>
      <div
        className="text-gray-700 mb-2"
        dangerouslySetInnerHTML={{ __html: bodySnippet }}
      ></div>
      {question.user && (
        <small className="text-gray-500">
          Posted by&nbsp;
          <Link
            to={`/users/${question.user.id}`}
            className="text-blue-700 hover:underline"
          >
            {question.user.name}
          </Link>
        </small>
      )}
    </div>
  );
};

export default QuestionItem;
