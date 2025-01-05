import React from "react"; // React를 사용하여 컴포넌트를 정의하고 관리하기 위해 import
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
} from "@mui/material"; // Material UI의 다양한 컴포넌트를 사용하기 위해 import
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap 스타일을 적용하기 위해 import
import { Link } from "react-router-dom"; // React Router를 사용하여 페이지 이동을 처리하기 위해 import
import "./Home.css"; // 커스텀 스타일을 적용하기 위해 Home.css 파일 import

const Home = () => {
  // Home 컴포넌트를 정의
  return (
    <div className="home">
      {" "}
      {/* 전체 페이지를 감싸는 div, CSS 클래스 "home" 적용 */}
      {/* 네비게이션 바 */}
      <AppBar
        position="sticky" // 네비게이션 바를 스크롤 시에도 고정되도록 설정
        style={{ backgroundColor: "#FFF", height: "88px" }} // 네비게이션 바 스타일 정의
      >
        <Toolbar
          style={{
            minHeight: "88px", // 툴바의 최소 높이 설정
            display: "flex", // 툴바 내 아이템을 Flexbox로 배치
            justifyContent: "space-between", // 좌우 아이템 간 간격을 균등하게 분리
          }}
        >
          {/* 클릭 가능한 로고 */}
          <Typography
            variant="h4" // 제목의 크기와 스타일을 Material UI의 h4로 설정
            component="div" // HTML div 태그로 렌더링
            style={{ fontWeight: "bold", fontSize: "28px" }} // 텍스트의 두께와 크기 설정
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
      {/* 서비스 이름 추가 */}
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {" "}
        {/* 서비스 이름을 중앙에 정렬 */}
        <Grid item xs={12}>
          {" "}
          {/* 전체 너비를 차지하는 Grid 아이템 */}
          <Typography
            variant="h3" // 제목 크기를 Material UI의 h3로 설정
            align="center" // 텍스트를 중앙 정렬
            sx={{ fontWeight: "bold", marginTop: 8 }} // 텍스트의 두께와 상단 여백 설정
          >
            JOB&nbsp;&nbsp;&nbsp;問&nbsp;&nbsp;&nbsp;JOB&nbsp;&nbsp;&nbsp;答{" "}
            {/* 서비스 이름 추가 */}
          </Typography>
        </Grid>
      </Grid>
      {/* 메인 콘텐츠 */}
      <Container
        maxWidth="lg"
        className="main-content text-center"
        style={{ marginTop: "5px" }}
      >
        {" "}
        {/* 콘텐츠를 감싸는 Container, Bootstrap 스타일 포함 */}
        <Typography
          variant="h3" // 제목 크기를 Material UI의 h2로 설정
          className="main-title my-4" // Bootstrap 스타일 추가 (상하 여백)
          style={{ fontWeight: "bold" }} // 텍스트 두께를 굵게 설정
        >
          이제, AI로 모의 면접을 시작하세요 {/* 메인 메시지 */}
        </Typography>
        <Typography
          variant="body1" // 텍스트 크기를 Material UI의 body1로 설정
          className="main-description mb-4" // Bootstrap 스타일 추가 (하단 여백)
          style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "10px" }} // 텍스트 스타일과 크기 설정
        >
          JOB문JOB답의 AI 기반 모의 면접으로 실전처럼 준비하세요!{" "}
          {/* 서브 메시지 */}
        </Typography>
        <Button
          variant="contained" // 버튼 스타일을 Material UI의 Contained 버튼으로 설정
          size="large" // 버튼 크기를 크게 설정
          sx={{
            backgroundColor: "#084032", // 버튼 배경색 설정
            color: "#fff", // 버튼 텍스트 색상 설정
            padding: "10px 24px", // 버튼 안쪽 여백 설정
            fontSize: "25px", // 버튼 텍스트 크기 설정
            fontWeight: "bold", // 버튼 텍스트 굵기 설정
            borderRadius: "8px", // 버튼 모서리를 둥글게 설정
            "&:hover": {
              backgroundColor: "#fff", // 호버 시 배경색
              color: "#084032", // 호버 시 텍스트 색상
            },
          }}
          className="start-button" // CSS 클래스 추가
          onClick={() => (window.location.href = "/input")} // 버튼 클릭 시 '/input' 페이지로 이동
        >
          모의 면접 시작하기 {/* 버튼 텍스트 */}
        </Button>
      </Container>
      {/* 스크롤 섹션 */}
      <Container maxWidth="lg" className="scroll-sections">
        {" "}
        {/* 스크롤 섹션을 감싸는 Container */}
        <Grid container spacing={4} className="mt-5">
          {" "}
          {/* Grid를 사용하여 반응형 레이아웃 구성 */}
          <Grid item xs={12} md={4}>
            {" "}
            {/* 작은 화면에서는 전체 너비, 중간 이상 화면에서는 1/3 너비 */}
            <Box className="scroll-section p-3 shadow">
              {" "}
              {/* 섹션의 외관 스타일 정의 */}
              <Typography
                variant="h5" // 제목 크기를 Material UI의 h5로 설정
                className="scroll-title" // CSS 클래스 추가
                style={{ fontWeight: "bold", fontSize: "25px" }} // 텍스트 스타일 설정
              >
                자기소개서를 분석합니다 {/* 섹션 제목 */}
              </Typography>
              <Typography
                variant="body2" // 텍스트 크기를 Material UI의 body2로 설정
                style={{ marginTop: "15px", fontSize: "18px" }} // 텍스트 상단 여백 및 크기 설정
              >
                AI가 당신의 자기소개서를 분석하여 적절한 면접 질문을 추출합니다.{" "}
                {/* 섹션 설명 */}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* 두 번째 섹션 */}
            <Box className="scroll-section p-3 shadow">
              {" "}
              {/* 섹션의 외관 스타일 정의 */}
              <Typography
                variant="h5"
                className="scroll-title"
                style={{ fontWeight: "bold", fontSize: "25px" }}
              >
                지원 직무를 분석합니다 {/* 섹션 제목 */}
              </Typography>
              <Typography
                variant="body2"
                style={{ marginTop: "15px", fontSize: "18px" }}
              >
                지원하는 직무의 핵심 요구사항에 맞춘 질문을 제공합니다.{" "}
                {/* 섹션 설명 */}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* 세 번째 섹션 */}
            <Box className="scroll-section p-3 shadow">
              {" "}
              {/* 섹션의 외관 스타일 정의 */}
              <Typography
                variant="h5"
                className="scroll-title"
                style={{ fontWeight: "bold", fontSize: "25px" }}
              >
                실전처럼 면접을 준비하세요 {/* 섹션 제목 */}
              </Typography>
              <Typography
                variant="body2"
                style={{ marginTop: "15px", fontSize: "18px" }}
              >
                채팅 형태의 모의 면접으로 실전과 같은 경험을 제공합니다.{" "}
                {/* 섹션 설명 */}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home; // Home 컴포넌트를 export하여 다른 파일에서 사용 가능
