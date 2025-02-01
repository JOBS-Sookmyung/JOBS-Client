// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   Button,
//   Box,
//   Paper,
// } from "@mui/material";
// import { useNavigate, Link } from "react-router-dom";
// import "./QuestionList.css";

// const QuestionList = () => {
//   // 예시 질문 데이터
//   const questions = [
//     "이 직무를 지원하게 된 동기는 무엇인가요?",
//     "본인의 강점과 약점은 무엇인가요?",
//     "입사 후 5년 뒤 본인의 모습을 상상해본다면?",
//     "팀 프로젝트에서 갈등 상황을 해결한 경험이 있다면?",
//     "이 회사에 지원하기 위해 어떤 준비를 했나요?",
//   ];

//   const navigate = useNavigate();

//   const handleAnswer = (question) => {
//     navigate("/chat", { state: { question } });
//   };

//   return (
//     <div className="question-list-page">
//       {/* 상단 헤더 */}
//       <AppBar
//         position="sticky"
//         style={{ backgroundColor: "#fff", height: "88px" }}
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
//             <Link to="/" style={{ textDecoration: "none" }}>
//               <img
//                 src="/logo.png" // public 폴더의 logo.png 파일 경로
//                 alt="JOB問JOB答 로고" // 이미지 대체 텍스트
//                 style={{ height: "70px" }} // 원하는 이미지 크기로 설정
//               />
//             </Link>
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* 질문 리스트 */}
//       <Container maxWidth="md" className="question-list-container">
//         <Typography
//           variant="h5"
//           style={{
//             fontWeight: "bold",
//             fontSize: "28px",
//             margin: "25px 0",
//             color: "#000",
//           }}
//         >
//           예상 질문
//         </Typography>

//         {/* 질문 카드 반복 */}
//         <Box>
//           {questions.map((question, index) => (
//             <Paper
//               key={index}
//               elevation={3}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "20px",
//                 marginBottom: "15px",
//                 backgroundColor: "#EFF0EE",
//                 borderRadius: "8px",
//               }}
//             >
//               <Typography
//                 variant="body2"
//                 style={{ fontSize: "18px", color: "#000" }}
//               >
//                 {question}
//               </Typography>
//               <Button
//                 variant="contained"
//                 style={{
//                   backgroundColor: "#084032",
//                   color: "#fff",
//                   fontSize: "16px",
//                 }}
//                 onClick={() => handleAnswer(question)}
//               >
//                 답변하기
//               </Button>
//             </Paper>
//           ))}
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default QuestionList;
// -

// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Container, Typography, Button, Box, Paper } from "@mui/material";
// import Header from "../../component/Header";
// import "./QuestionList.css";
// import axios from "axios";
// // import Cookies from "js-cookie";

// const Questions = () => {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   // const [token, setToken] = useState(Cookies.get('token') || null);

//   // 리터럴 데이터셋
//   const tempQuestions = [
//     "이 직무를 지원하게 된 동기는 무엇인가요?",
//     "본인의 강점과 약점은 무엇인가요?",
//     "입사 후 5년 뒤 본인의 모습을 상상해본다면?",
//     "팀 프로젝트에서 갈등 상황을 해결한 경험이 있다면?",
//     "이 회사에 지원하기 위해 어떤 준비를 했나요?",
//   ];

//   const handleAnswer = (question) => {
//     navigate("/chat", { state: { question } });
//   };

//   //코드 추가 : fastapi연동
//   const reloadQuestions = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/questions/", {
//         withCredentials: true,
//       });
//       const result = res.data;
//       if (result) {
//         console.log(result);
//         setQuestions(result);
//       }
//     } catch (e) {
//       // alert(e)
//     }
//   };
//   useEffect(() => {
//     reloadQuestions();
//   }, []);

//   return (
//     <div className="question-list-page">
//       <Header />
//       {/* 질문 리스트 */}
//       <Container maxWidth="md" className="question-list-container">
//         <Typography
//           variant="h5"
//           style={{
//             fontWeight: "bold",
//             fontSize: "28px",
//             margin: "25px 0",
//             color: "#000",
//           }}
//         >
//           예상 질문
//         </Typography>

//         {/* 질문 카드 반복 */}
//         <Box>
//           {questions.map((question, index) => (
//             <Paper
//               key={index}
//               elevation={3}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "20px",
//                 marginBottom: "15px",
//                 backgroundColor: "#EFF0EE",
//                 borderRadius: "8px",
//               }}
//             >
//               <Typography
//                 variant="body2"
//                 style={{ fontSize: "18px", color: "#000" }}
//               >
//                 {question}
//               </Typography>
//               <Button
//                 variant="contained"
//                 style={{
//                   backgroundColor: "#084032",
//                   color: "#fff",
//                   fontSize: "16px",
//                 }}
//                 onClick={() => handleAnswer(question)}
//               >
//                 답변하기
//               </Button>
//             </Paper>
//           ))}
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default Questions;
//--

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import Header from "../../component/Header";
import "./QuestionList.css";
import axios from "axios";
const questionIds = {
  "이 직무를 지원하게 된 동기는 무엇인가요?": 1,
  "본인의 강점과 약점은 무엇인가요?": 2,
  "입사 후 5년 뒤 본인의 모습을 상상해본다면?": 3,
  "팀 프로젝트에서 갈등 상황을 해결한 경험이 있다면?": 4,
  "이 회사에 지원하기 위해 어떤 준비를 했나요?": 5,
};

const Questions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    "이 직무를 지원하게 된 동기는 무엇인가요?",
    "본인의 강점과 약점은 무엇인가요?",
    "입사 후 5년 뒤 본인의 모습을 상상해본다면?",
    "팀 프로젝트에서 갈등 상황을 해결한 경험이 있다면?",
    "이 회사에 지원하기 위해 어떤 준비를 했나요?",
  ]); // tempQuestions를 기본값으로 설정

  const handleAnswer = (question) => {
    const id = questionIds[question];
    navigate(`/chat/1/${id}`, { state: { question } });
  };

  const reloadQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/questions/", {
        withCredentials: true,
      });
      const result = res.data;
      if (result && Array.isArray(result)) {
        setQuestions(result); // 서버에서 데이터를 성공적으로 가져온 경우 업데이트
      } else {
        console.error("Invalid data format received:", result);
      }
    } catch (e) {
      console.error("Error fetching questions:", e);
    }
  };

  useEffect(() => {
    reloadQuestions(); // 컴포넌트 로드 시 질문 리스트 불러오기
  }, []);

  return (
    <div className="question-list-page">
      <Header />
      <Container maxWidth="md" className="question-list-container">
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
            fontSize: "28px",
            margin: "25px 0",
            color: "#000",
          }}
        >
          예상 질문
        </Typography>
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
                marginBottom: "15px",
                backgroundColor: "#EFF0EE",
                borderRadius: "8px",
              }}
            >
              <Typography
                variant="body2"
                style={{ fontSize: "18px", color: "#000" }}
              >
                {question}
              </Typography>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#084032",
                  color: "#fff",
                  fontSize: "16px",
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

export default Questions;
