import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserQuestionsPage from "./pages/UserQuestionsPage";
import QuestionDetailsPage from "./pages/QuestionDetailsPage";
import QuestionsPage from "./pages/QuestionsPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<QuestionsPage />} />
          <Route
            path="/users/:userId"
            element={<UserQuestionsPage />}
          />
          <Route
            path="/questions/:questionId"
            element={<QuestionDetailsPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
