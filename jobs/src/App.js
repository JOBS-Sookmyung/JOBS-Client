import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Input from "./pages/Input/Input";
import QuestionList from "./pages/QuestionList/QuestionList"; // 새로 추가된 페이지 import
import AnswerDetailPage from "./pages/Chat/Chat";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<Input />} />
        <Route path="/questions" element={<QuestionList />} />{" "}
        {/* 새로운 라우트 추가 */}
        <Route path="/chat" element={<AnswerDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
