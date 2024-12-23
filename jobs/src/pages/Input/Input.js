import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import "./Input.css";

const Input = () => {
  const [jobPostingUrl, setJobPostingUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [customSummary, setCustomSummary] = useState("");

  const navigate = useNavigate(); // useNavigate 훅 초기화

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`${file.name} 파일이 업로드되었습니다.`);
    }
  };

  const handleSummarize = () => {
    // AI로 요약된 내용을 기본값으로 설정
    const aiGeneratedSummary =
      "공고 내용 요약해서 보여주기\nex) 소개, 회사 위치, 요구하는 직무 능력";
    setSummary(aiGeneratedSummary);
    setCustomSummary(aiGeneratedSummary);
  };

  const handleProceedToInterview = () => {
    // QuestionList 페이지로 이동
    navigate("/questions");
  };

  return (
    <div className="input-page">
      {/* 상단 헤더 (메인 페이지와 동일) */}
      <AppBar
        position="sticky"
        style={{ backgroundColor: "#EEEDEC", height: "88px" }}
      >
        <Toolbar
          style={{
            minHeight: "88px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            style={{ fontWeight: "bold", fontSize: "28px" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "#1A1918" }}>
              JOB問JOB答
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 메인 콘텐츠 */}
      <Container maxWidth="md" className="input-container">
        {/* 자기소개서 파일 첨부 */}
        <Typography variant="h5" className="section-title">
          자소서 파일첨부
        </Typography>
        <Typography variant="body2" className="file-hint">
          500MB 이하의 pdf파일 업로드 가능
        </Typography>
        <Box className="file-upload-container">
          <input
            type="file"
            className="file-upload"
            accept=".doc,.docx,.pdf"
            onChange={handleFileUpload}
          />
        </Box>

        {/* 공고 URL 첨부 */}
        <Typography variant="h5" className="section-title">
          공고 url 첨부
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="채용공고 url을 입력하세요"
          value={jobPostingUrl}
          onChange={(e) => setJobPostingUrl(e.target.value)}
          className="url-input"
        />
        <Button
          variant="contained"
          className="summarize-button"
          onClick={handleSummarize}
        >
          공고 요약하기
        </Button>

        {/* 포지션 요약 */}
        <Typography variant="h5" className="section-title">
          포지션 요약
        </Typography>
        <TextField
          variant="outlined"
          multiline
          rows={6}
          fullWidth
          value={customSummary}
          onChange={(e) => setCustomSummary(e.target.value)}
          className="summary-textarea"
        />

        {/* 예상 질문 생성 버튼 */}
        <Button
          variant="contained"
          className="generate-button"
          onClick={handleProceedToInterview} // 클릭 시 페이지 전환
        >
          예상 질문 생성하기
        </Button>
      </Container>
    </div>
  );
};

export default Input;
