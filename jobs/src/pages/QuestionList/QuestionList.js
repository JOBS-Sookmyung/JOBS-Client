import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./QuestionList.css";

const QuestionList = () => {
  // 예시 질문 데이터
  const questions = [
    "이 직무를 지원하게 된 동기는 무엇인가요?",
    "본인의 강점과 약점은 무엇인가요?",
    "입사 후 5년 뒤 본인의 모습을 상상해본다면?",
    "팀 프로젝트에서 갈등 상황을 해결한 경험이 있다면?",
    "이 회사에 지원하기 위해 어떤 준비를 했나요?",
  ];

  const handleAnswer = (question) => {
    alert(`"${question}" 질문에 대한 답변 준비 페이지로 이동합니다.`);
    // 실제로는 페이지 이동 로직 추가
  };

  return (
    <div className="question-list-page">
      {/* 상단 헤더 */}
      <AppBar
        position="sticky"
        style={{ backgroundColor: "#f5a5a5", height: "100px" }}
      >
        <Toolbar
          style={{
            minHeight: "100px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            style={{ fontWeight: "bold", fontSize: "28px" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              면JOBS
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 질문 리스트 */}
      <Container maxWidth="md" className="question-list-container">
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", margin: "20px 0", color: "#333" }}
        >
          예상 질문
        </Typography>

        {/* 질문 카드 반복 */}
        <Box>
          {questions.map((question, index) => (
            <Paper
              key={index}
              elevation={3}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
                marginBottom: "10px",
                backgroundColor: "#fff4e6",
                borderRadius: "8px",
              }}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "16px", color: "#333" }}
              >
                {question}
              </Typography>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#f5a5a5",
                  color: "#fff",
                  fontWeight: "bold",
                }}
                onClick={() => handleAnswer(question)}
              >
                답변하기
              </Button>
            </Paper>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default QuestionList;
