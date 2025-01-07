import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Input from "./pages/Input/Input";
import QuestionList from "./pages/QuestionList/QuestionList";
import AnswerDetailPage from "./pages/Chat/Chat";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<Input />} />
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/chat" element={<AnswerDetailPage />} />
        <Route path="*" element={<NotFound />} /> {/* 404 페이지 라우트 추가 */}
      </Routes>
    </Router>
  );
};

export default App;
