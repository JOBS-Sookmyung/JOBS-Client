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
  const [questions, setQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // 파일 업로드 및 URL 전송 함수
  const handleUploadResume = async () => {
    if (!file) {
      alert("파일을 업로드해주세요.");
      return false;
    }
    if (!recruitUrl) {
      alert("채용공고 URL을 입력해주세요.");
      return false;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("recruitUrl", recruitUrl);
    formData.append("recentDate", new Date().toISOString());

    try {
      const response = await fetch("http://localhost:8000/input/uploadfile/", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        console.log("이력서 업로드 성공:", result);
        return true; // 성공 시 true 반환
      } else {
        alert("업로드 실패: " + result.detail);
        return false;
      }
    } catch (error) {
      console.error("업로드 중 오류 발생:", error);
      alert("서버와 연결할 수 없습니다.");
      return false;
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      alert("파일이 선택되지 않았습니다.");
      return;
    }
    setFile(selectedFile);
  };

  // 채용공고 URL 입력 핸들러
  const handleRecruitUrlChange = (e) => {
    setRecruitUrl(e.target.value);
  };

  // URL 스크래핑 함수
  const handleScrapeUrl = async () => {
    if (!recruitUrl) {
      alert("URL을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/scrape-url/?url=${recruitUrl}`);
      const result = await response.json();

      if (response.ok) {
        console.log("스크래핑 성공:", result);
        return result; // 스크래핑된 데이터를 반환
      } else {
        alert("스크래핑 실패: " + result.detail);
      }
    } catch (error) {
      console.error("스크래핑 중 오류 발생:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  // 예상 질문 생성 핸들러
  const handleGenerateQuestions = async () => {
    if (!file || !recruitUrl) {
      alert("이력서 파일과 공고 URL을 모두 입력해 주세요.");
      return;
    }

    setIsLoadingQuestions(true);

    // 1. 이력서 업로드 및 텍스트 추출
    const uploadSuccess = await handleUploadResume();
    if (!uploadSuccess) {
      setIsLoadingQuestions(false);
      return; // 업로드 실패 시 중단
    }

    // 2. URL 스크래핑
    let scrapedData = await handleScrapeUrl(); // 스크래핑된 데이터 가져오기
    if (!scrapedData) {
      setIsLoadingQuestions(false);
      return; // 스크래핑 실패 시 중단
    }

    // 3. 예상 질문 생성
    setTimeout(() => {
      // 예시로 모의 질문 생성
      const mockQuestions = [
        "귀하의 이력서에서 가장 중요한 경험에 대해 말씀해 주세요.",
        "이 채용공고의 요구사항과 관련하여 가장 중요한 기술은 무엇인가요?",
        "이전 직장에서 맡았던 프로젝트에 대해 설명해 주세요.",
        "해당 직무에 적합한 이유는 무엇인가요?",
        "이 회사에서의 비전과 목표에 대해 어떻게 생각하나요?"
      ];
      
      // TODO: 실제로는 scrapedData와 resumeData를 바탕으로 질문을  더 구체적으로 생성
      setQuestions(mockQuestions);
      navigate("/chat", { state: { questions: mockQuestions } });
      setIsLoadingQuestions(false);
    }, 1000);
  };

  return (
    <div className="input-page">
      <Header />
      <Container maxWidth="md" className="input-container">
        {/* 왼쪽 - 이력서 업로드 */}
        <Box className="left-section">
          <Typography variant="h5" className="section-title">
            이력서 파일 첨부
          </Typography>
          <input
            type="file"
            accept=".doc,.docx,.pdf"
            onChange={handleFileChange}
          />
        </Box>

        {/* 공고 URL 입력 */}
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
            {isLoadingQuestions ? <CircularProgress size={24} /> : "모의면접 시작하기"}
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Input;
