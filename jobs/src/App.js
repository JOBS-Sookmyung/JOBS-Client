import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // MUI 테마 가져오기
import Home from "./pages/Home/Home";
import Input from "./pages/Input/Input";
import Chat from "./pages/Chat/Chat";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/input" element={<Input />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/1/:questionId" element={<Chat />} />{" "}
          {/* ✅ 질문 선택 시 이동 */}
          <Route path="*" element={<NotFound />} />{" "}
          {/* 404 페이지 라우트 추가 */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
