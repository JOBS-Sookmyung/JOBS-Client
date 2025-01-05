// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   TextField,
//   Button,
//   Box,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
// import "./Input.css";

// const Input = () => {
//   const [jobPostingUrl, setJobPostingUrl] = useState("");
//   const [summary, setSummary] = useState("");
//   const [customSummary, setCustomSummary] = useState("");

//   const navigate = useNavigate(); // useNavigate 훅 초기화

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       alert(`${file.name} 파일이 업로드되었습니다.`);
//     }
//   };

//   const handleSummarize = () => {
//     // AI로 요약된 내용을 기본값으로 설정
//     const aiGeneratedSummary =
//       "공고 내용 요약해서 보여주기\nex) 소개, 회사 위치, 요구하는 직무 능력";
//     setSummary(aiGeneratedSummary);
//     setCustomSummary(aiGeneratedSummary);
//   };

//   const handleProceedToInterview = () => {
//     // QuestionList 페이지로 이동
//     navigate("/questions");
//   };

//   return (
//     <div className="input-page">
//       {/* 상단 헤더 (메인 페이지와 동일) */}
//       <AppBar
//         position="sticky"
//         style={{ backgroundColor: "#EEEDEC", height: "88px" }}
//       >
//         <Toolbar
//           style={{
//             minHeight: "88px",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography
//             variant="h4"
//             component="div"
//             style={{ fontWeight: "bold", fontSize: "28px" }}
//           >
//             <Link to="/" style={{ textDecoration: "none", color: "#1A1918" }}>
//               JOB問JOB答
//             </Link>
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* 메인 콘텐츠 */}
//       <Container maxWidth="md" className="input-container">
//         {/* 자기소개서 파일 첨부 */}
//         <Typography variant="h5" className="section-title">
//           자소서 파일첨부
//         </Typography>
//         <Typography variant="body2" className="file-hint">
//           500MB 이하의 pdf파일 업로드 가능
//         </Typography>
//         <Box className="file-upload-container">
//           <input
//             type="file"
//             className="file-upload"
//             accept=".doc,.docx,.pdf"
//             onChange={handleFileUpload}
//           />
//         </Box>

//         {/* 공고 URL 첨부 */}
//         <Typography variant="h5" className="section-title">
//           공고 url 첨부
//         </Typography>
//         <TextField
//           variant="outlined"
//           fullWidth
//           placeholder="채용공고 url을 입력하세요"
//           value={jobPostingUrl}
//           onChange={(e) => setJobPostingUrl(e.target.value)}
//           className="url-input"
//         />
//         <Button
//           variant="contained"
//           className="summarize-button"
//           onClick={handleSummarize}
//         >
//           공고 요약하기
//         </Button>

//         {/* 포지션 요약 */}
//         <Typography variant="h5" className="section-title">
//           포지션 요약
//         </Typography>
//         <TextField
//           variant="outlined"
//           multiline
//           rows={6}
//           fullWidth
//           value={customSummary}
//           onChange={(e) => setCustomSummary(e.target.value)}
//           className="summary-textarea"
//         />

//         {/* 예상 질문 생성 버튼 */}
//         <Button
//           variant="contained"
//           className="generate-button"
//           onClick={handleProceedToInterview} // 클릭 시 페이지 전환
//         >
//           예상 질문 생성하기
//         </Button>
//       </Container>
//     </div>
//   );
// };

// export default Input;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Box,
} from "@mui/material";
import "./Input.css";

import axios from "axios";
import Cookies from "js-cookie";

const MB = 1024 * 1024;
const MAX_FSIZE = 50 * MB;

const Input = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [recruitUrl, setRecruitUrl] = useState("");
  const [summaryText, setSummaryText] = useState("");
  const [recentDate, setRecentDate] = useState("");
  const [token, setToken] = useState(Cookies.get("token") || null);

  const updateToken = () => {
    const newToken = Cookies.get("token");
    if (newToken && !token) {
      setToken(newToken);
    }
  };
  useEffect(updateToken, [token]);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return alert("알려지지 않은 오류: 파일 없음.");
    if (f.size > MAX_FSIZE) return alert("파일 용량 제한을 초과하였습니다.");
    setFile(f);
  };

  const handleRecruitUrlChange = (e) => {
    setRecruitUrl(e.target.value);
  };

  const handleSummaryTextChange = (e) => {
    setSummaryText(e.target.value);
  };

  const handleSummarize = async () => {
    if (!file) return console.warn("400 (File Empty)");

    console.log("자소서 첨부:", file);
    console.log("채용공고 링크:", recruitUrl);
    // console.log('포지션 요약:', summaryText);
    console.log("마지막 수정:", await updateDate());

    // TODO: 포지션 요약 로직을 추가
  };

  //questions 라우터로 이동
  const handleProceedToInterview = () => {
    navigate("/questions");
  };

  const updateDate = async () => {
    const nowDate = new Date(Date.now()).toUTCString();
    setRecentDate(nowDate);
    return Promise.resolve(nowDate);
  };

  const reloadForm = async () => {
    try {
      const res = await axios.get("http://localhost:8080/input/", {
        withCredentials: true,
      });
      const result = res.data;
      if (result) {
        console.log(result);
        // setFile(result.fileDirname); 지우지 마세요!!!!!!!!!!!!
        setRecruitUrl(result.recruitUrl);
        // setSummaryText(result.summaryText);
        setRecentDate(result.recentDate);
      }
    } catch (e) {
      // alert(e)
    }
  };
  useEffect(() => {
    reloadForm();
  }, []);

  const uploadFile = async () => {
    if (!file) return;

    const ep = "http://localhost:8080/input/uploadfile/";

    const body = new FormData();
    body.set("file", file);

    const tail = { recruitUrl, /*summaryText, */ recentDate };
    for (let [k, v] of Object.entries(tail)) {
      body.set(k, v);
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    let result = null;
    try {
      const res = await axios.post(ep, body, config);
      result = res.data;
    } catch (e) {
      alert(e);
      result = e;
    }
    console.log("업로드 결과:", result);
  };
  useEffect(() => {
    uploadFile();
  }, [recentDate]);

  //여기서부터 디자인
  return (
    <div className="input-page">
      {/* 상단 헤더 (메인 페이지와 동일) */}
      <AppBar
        position="sticky"
        style={{ backgroundColor: "#fff", height: "88px" }}
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
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src="/logo.png" // public 폴더의 logo.png 파일 경로
                alt="JOB問JOB答 로고" // 이미지 대체 텍스트
                style={{ height: "70px" }} // 원하는 이미지 크기로 설정
              />
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
          500MB 이하의 Word, PDF 파일 업로드 가능
        </Typography>
        <Box className="file-upload-container">
          <input
            type="file"
            accept=".doc,.docx,.pdf"
            onChange={handleFileChange}
          />
        </Box>

        {/* 공고 URL 첨부 */}
        <Typography variant="h6" className="section-title">
          공고 url 첨부
        </Typography>
        <Typography variant="body2" className="recent-date">
          {recentDate === "" ? "" : `마지막 수정: ${recentDate}`}
        </Typography>

        <TextField
          variant="outlined"
          fullWidth
          placeholder="채용공고 url을 입력하세요."
          value={recruitUrl}
          onChange={handleRecruitUrlChange}
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
          placeholder="공고 내용을 요약해서 보여주기
          ex) 소개, 회사위치, 요구하는 직무능력"
          value={summaryText}
          onChange={handleSummaryTextChange}
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
