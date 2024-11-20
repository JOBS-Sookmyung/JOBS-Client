import React from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"; // react-router-dom 사용
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* 네비게이션 바 */}
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
          {/* 클릭 가능한 로고 */}
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

      {/* 메인 콘텐츠 */}
      <Container maxWidth="lg" className="main-content text-center">
        <Typography
          variant="h2"
          className="main-title my-4"
          style={{ fontWeight: "bold" }}
        >
          이제, AI로 모의 면접을 시작하세요
        </Typography>
        <Typography
          variant="body1"
          className="main-description mb-4"
          style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "10px" }}
        >
          면JOBS의 AI 기반 모의 면접으로 실전처럼 준비하세요!
        </Typography>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#f5a5a5",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "25px",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
          size="large"
          className="start-button"
          onClick={() => (window.location.href = "/input")}
        >
          모의 면접 시작하기
        </Button>
      </Container>

      {/* 스크롤 섹션 */}
      <Container maxWidth="lg" className="scroll-sections">
        <Grid container spacing={4} className="mt-5">
          <Grid item xs={12} md={4}>
            <Box className="scroll-section p-3 shadow">
              <Typography
                variant="h5"
                className="scroll-title"
                style={{ fontWeight: "bold", fontSize: "25px" }}
              >
                자기소개서를 분석합니다
              </Typography>
              <Typography
                variant="body2"
                style={{ marginTop: "15px", fontSize: "18px" }}
              >
                AI가 당신의 자기소개서를 분석하여 적절한 면접 질문을 추출합니다.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className="scroll-section p-3 shadow">
              <Typography
                variant="h5"
                className="scroll-title"
                style={{ fontWeight: "bold", fontSize: "25px" }}
              >
                지원 직무를 분석합니다
              </Typography>
              <Typography
                variant="body2"
                style={{ marginTop: "15px", fontSize: "18px" }}
              >
                지원하는 직무의 핵심 요구사항에 맞춘 질문을 제공합니다.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className="scroll-section p-3 shadow">
              <Typography
                variant="h5"
                className="scroll-title"
                style={{ fontWeight: "bold", fontSize: "25px" }}
              >
                실전처럼 면접을 준비하세요
              </Typography>
              <Typography
                variant="body2"
                style={{ marginTop: "15px", fontSize: "18px" }}
              >
                채팅 형태의 모의 면접으로 실전과 같은 경험을 제공합니다.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;