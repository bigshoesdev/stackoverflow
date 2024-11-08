import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchQuestionDetails } from "../slices/questionDetails";
import { format } from "date-fns";

const QuestionDetailsPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { question, loading, error } = useSelector(
    (state: RootState) => state.questionDetails
  );

  useEffect(() => {
    if (questionId) {
      dispatch(fetchQuestionDetails(questionId));
    }
  }, [dispatch, questionId]);

  if (loading) {
    return <p className="text-center text-lg text-blue-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {question && (
        <div>
          <h1 className="text-3xl font-extrabold mb-6 text-gray-900">
            {question.title}
          </h1>

          <div
            className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-gray-800"
            dangerouslySetInnerHTML={{ __html: question.body }}
          ></div>

          <h2 className="text-2xl font-bold mb-4 text-blue-700">Answers</h2>
          {question.answers && question.answers.length > 0 ? (
            question.answers.map((answer) => (
              <div
                key={answer.id}
                className="mb-6 p-5 bg-blue-50 border border-blue-200 rounded-lg shadow-md"
              >
                <p
                  className="text-gray-900 mb-3"
                  dangerouslySetInnerHTML={{ __html: answer.body }}
                ></p>
                {answer.user && (
                  <small className="text-gray-600 block mb-3 italic">
                    Answered by {answer.user.name} on{" "}
                    {format(new Date(answer.creationDate), "PPP")}
                  </small>
                )}

                {answer.comments && answer.comments.length > 0 && (
                  <div className="mt-4 p-4 bg-white border border-gray-100 rounded-lg">
                    <h3 className="text-md font-semibold mb-2 text-gray-700">
                      Comments:
                    </h3>
                    <ul className="space-y-2">
                      {answer.comments.map((comment) => (
                        <li
                          key={comment.id}
                          className="text-gray-600 bg-gray-50 p-2 rounded-md shadow-sm"
                        >
                          <p
                            dangerouslySetInnerHTML={{ __html: comment.body }}
                          ></p>
                          <small className="text-gray-500">
                            {comment.user &&
                              `Commented by ${comment.user.name}`}{" "}
                          </small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">
              No answers yet. Be the first to answer!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionDetailsPage;
