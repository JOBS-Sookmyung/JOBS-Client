// import React from "react";
// import { Button, Typography, Box, Container, Grid } from "@mui/material";
// import { Link } from "react-router-dom"; // React Router를 사용하여 페이지 이동을 처리
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Home.css";
// import Header from "../../component/Header"; // Header 컴포넌트

// const Home = () => {
//   // Home 컴포넌트를 정의
//   return (
//     <div className="home">
//       <Header /> {/* Header 컴포넌트 추가 */}{" "}
//       {/* 전체 페이지를 감싸는 div, CSS 클래스 "home" 적용 */}
//       {/* 서비스 이름 추가 */}
//       <Grid container spacing={2} justifyContent="center" alignItems="center">
//         {" "}
//         {/* 서비스 이름을 중앙에 정렬 */}
//         <Grid item xs={12}>
//           {" "}
//           {/* 전체 너비를 차지하는 Grid 아이템 */}
//           <Typography
//             variant="h3" // 제목 크기를 Material UI의 h3로 설정
//             align="center" // 텍스트를 중앙 정렬
//             sx={{ fontWeight: "bold", marginTop: 8 }} // 텍스트의 두께와 상단 여백 설정
//           >
//             JOB&nbsp;&nbsp;&nbsp;問&nbsp;&nbsp;&nbsp;JOB&nbsp;&nbsp;&nbsp;答{" "}
//             {/* 서비스 이름 추가 */}
//           </Typography>
//         </Grid>
//       </Grid>
//       {/* 메인 콘텐츠 */}
//       <Container
//         maxWidth="lg"
//         className="main-content text-center"
//         style={{ marginTop: "5px" }}
//       >
//         {" "}
//         {/* 콘텐츠를 감싸는 Container, Bootstrap 스타일 포함 */}
//         <Typography
//           variant="h3" // 제목 크기를 Material UI의 h2로 설정
//           className="main-title my-4" // Bootstrap 스타일 추가 (상하 여백)
//           style={{ fontWeight: "bold" }} // 텍스트 두께를 굵게 설정
//         >
//           이제, AI로 모의 면접을 시작하세요 {/* 메인 메시지 */}
//         </Typography>
//         <Typography
//           variant="body1" // 텍스트 크기를 Material UI의 body1로 설정
//           className="main-description mb-4" // Bootstrap 스타일 추가 (하단 여백)
//           style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "10px" }} // 텍스트 스타일과 크기 설정
//         >
//           JOB문JOB답의 AI 기반 모의 면접으로 실전처럼 준비하세요!{" "}
//           {/* 서브 메시지 */}
//         </Typography>
//         <Button
//           variant="contained" // 버튼 스타일을 Material UI의 Contained 버튼으로 설정
//           size="large" // 버튼 크기를 크게 설정
//           sx={{
//             backgroundColor: "#084032", // 버튼 배경색 설정
//             color: "#fff", // 버튼 텍스트 색상 설정
//             padding: "10px 24px", // 버튼 안쪽 여백 설정
//             fontSize: "25px", // 버튼 텍스트 크기 설정
//             fontWeight: "bold", // 버튼 텍스트 굵기 설정
//             borderRadius: "8px", // 버튼 모서리를 둥글게 설정
//             "&:hover": {
//               backgroundColor: "#fff", // 호버 시 배경색
//               color: "#084032", // 호버 시 텍스트 색상
//             },
//           }}
//           className="start-button" // CSS 클래스 추가
//           onClick={() => (window.location.href = "/input")} // 버튼 클릭 시 '/input' 페이지로 이동
//         >
//           모의 면접 시작하기 {/* 버튼 텍스트 */}
//         </Button>
//       </Container>
//       {/* 스크롤 섹션 */}
//       <Container maxWidth="lg" className="scroll-sections">
//         {" "}
//         {/* 스크롤 섹션을 감싸는 Container */}
//         <Grid container spacing={4} className="mt-5">
//           {" "}
//           {/* Grid를 사용하여 반응형 레이아웃 구성 */}
//           <Grid item xs={12} md={4}>
//             {" "}
//             {/* 작은 화면에서는 전체 너비, 중간 이상 화면에서는 1/3 너비 */}
//             <Box className="scroll-section p-3 shadow">
//               {" "}
//               {/* 섹션의 외관 스타일 정의 */}
//               <Typography
//                 variant="h5" // 제목 크기를 Material UI의 h5로 설정
//                 className="scroll-title" // CSS 클래스 추가
//                 style={{ fontWeight: "bold", fontSize: "25px" }} // 텍스트 스타일 설정
//               >
//                 자기소개서를 분석합니다 {/* 섹션 제목 */}
//               </Typography>
//               <Typography
//                 variant="body2" // 텍스트 크기를 Material UI의 body2로 설정
//                 style={{ marginTop: "15px", fontSize: "18px" }} // 텍스트 상단 여백 및 크기 설정
//               >
//                 AI가 당신의 자기소개서를 분석하여 적절한 면접 질문을 추출합니다.{" "}
//                 {/* 섹션 설명 */}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             {" "}
//             {/* 두 번째 섹션 */}
//             <Box className="scroll-section p-3 shadow">
//               {" "}
//               {/* 섹션의 외관 스타일 정의 */}
//               <Typography
//                 variant="h5"
//                 className="scroll-title"
//                 style={{ fontWeight: "bold", fontSize: "25px" }}
//               >
//                 지원 직무를 분석합니다 {/* 섹션 제목 */}
//               </Typography>
//               <Typography
//                 variant="body2"
//                 style={{ marginTop: "15px", fontSize: "18px" }}
//               >
//                 지원하는 직무의 핵심 요구사항에 맞춘 질문을 제공합니다.{" "}
//                 {/* 섹션 설명 */}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             {" "}
//             {/* 세 번째 섹션 */}
//             <Box className="scroll-section p-3 shadow">
//               {" "}
//               {/* 섹션의 외관 스타일 정의 */}
//               <Typography
//                 variant="h5"
//                 className="scroll-title"
//                 style={{ fontWeight: "bold", fontSize: "25px" }}
//               >
//                 실전처럼 면접을 준비하세요 {/* 섹션 제목 */}
//               </Typography>
//               <Typography
//                 variant="body2"
//                 style={{ marginTop: "15px", fontSize: "18px" }}
//               >
//                 채팅 형태의 모의 면접으로 실전과 같은 경험을 제공합니다.{" "}
//                 {/* 섹션 설명 */}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </div>
//   );
// };

// export default Home; // Home 컴포넌트를 export하여 다른 파일에서 사용 가능

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../component/Header"; // ✅ 헤더 추가
import logo from "../../assets/logo.svg"; // ✅ 로고 이미지
import mainImage from "../../assets/main-image.png"; // ✅ 메인 이미지

const Home = () => {
  return (
    <>
      {/* ✅ 헤더 추가 */}
      <Header />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // ✅ 반응형: 모바일에서는 세로 정렬, 데스크탑에서는 가로 정렬
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 10%",
          gap: "50px",
        }}
      >
        {/* 왼쪽 텍스트 */}
        <Box
          sx={{
            flex: 1,
            textAlign: "left", // ✅ 왼쪽 정렬
            maxWidth: "600px",
          }}
        >
          <img
            src={logo}
            alt="JOBIS 로고"
            style={{ height: "40px", marginBottom: "20px" }}
          />

          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              marginBottom: "10px",
              fontSize: "36px",
            }}
          >
            간편하고 확실하게 <br />
            나의 면접을 준비하는 방법
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              maxWidth: "500px",
              marginBottom: "20px",
              fontSize: "18px",
            }}
          >
            언제 어디서든 이력서를 검토하고 면접을 준비하세요. <br />
            쉽고 간편하게 본인의 면접 준비 기록과 회사별 맞춤 이력서를 <br />
            확인할 수 있습니다.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#AA2217",
              color: "white",
              fontWeight: "bold",
              padding: "12px 20px",
              borderRadius: "8px",
              fontSize: "20px",
            }}
          >
            지금 시작하기
          </Button>
        </Box>

        {/* 오른쪽 이미지 */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img
            src={mainImage}
            alt="메인 이미지"
            style={{ width: "100%", maxWidth: "500px", height: "auto" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Home;
