import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Header from "../../component/Header";
import "./Input.css";

const Input = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [recruitUrl, setRecruitUrl] = useState("");
  const [feedback, setFeedback] = useState(""); // AI 피드백 저장
  const [questions, setQuestions] = useState([]); // AI 예상 질문 저장
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // 파일 선택
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return alert("파일이 선택되지 않았습니다.");
    setFile(f);
  };

  // 채용공고 URL 입력
  const handleRecruitUrlChange = (e) => {
    setRecruitUrl(e.target.value);
  };

  // 임시 피드백 표시
  const handleGetFeedback = () => {
    if (!file) return alert("파일을 업로드해주세요.");
    setIsLoadingFeedback(true);

    setTimeout(() => {
      setFeedback("이력서에 대한 피드백");
      setIsLoadingFeedback(false);
    }, 1000); // 1초 후 표시
  };

  // 임시 예상 질문 생성
  const handleGenerateQuestions = () => {
    if (!file) return alert("파일을 업로드해주세요.");
    if (!recruitUrl) return alert("채용공고 URL을 입력해주세요.");

    setIsLoadingQuestions(true);

    setTimeout(() => {
      const mockQuestions = ["질문1", "질문2", "질문3", "질문4", "질문5"];
      setQuestions(mockQuestions);
      navigate("/chat", { state: { questions: mockQuestions } });
      setIsLoadingQuestions(false);
    }, 1000); // 1초 후 질문 표시
  };

  return (
    <div className="input-page">
      <Header />
      <Container maxWidth="md" className="input-container">
        {/* 왼쪽 - 이력서 업로드 & 피드백 */}
        <Box className="left-section">
          <Typography variant="h5" className="section-title">
            이력서 파일 첨부
          </Typography>
          <input
            type="file"
            accept=".doc,.docx,.pdf"
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            className="feedback-button"
            onClick={handleGetFeedback}
            disabled={isLoadingFeedback}
          >
            {isLoadingFeedback ? <CircularProgress size={24} /> : "피드백 받기"}
          </Button>
        </Box>

        {/* 오른쪽 - 피드백 출력 */}
        <Box className="right-section">
          <Typography variant="body1" className="feedback-text">
            {feedback || "업로드한 이력서에 대한 피드백을 받아보세요!"}
          </Typography>
        </Box>

        {/* 공고 URL 첨부 */}
        <Box className="job-section">
          <Typography variant="h6" className="section-title">
            공고 URL 첨부
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="채용공고 URL을 입력하세요."
            value={recruitUrl}
            onChange={handleRecruitUrlChange}
          />
        </Box>

        {/* 모의면접 시작하기 버튼 */}
        <Box className="interview-section">
          <Button
            variant="contained"
            className="interview-button"
            onClick={handleGenerateQuestions}
            disabled={isLoadingQuestions}
          >
            {isLoadingQuestions ? (
              <CircularProgress size={24} />
            ) : (
              "모의면접 시작하기"
            )}
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Input;
