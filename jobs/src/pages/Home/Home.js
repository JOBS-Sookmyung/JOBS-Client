import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../component/Header";
import LoginModal from "../../component/LoginModal";
import logo from "../../assets/logo.svg";
import mainImage from "../../assets/main-image.png";

import unemployedImg from "../../assets/unemployed.png"; // 무직 이미지
import workerImg from "../../assets/worker.png"; // 직장인 이미지
import studentImg from "../../assets/student.png"; // 학생 이미지
import goodImg from "../../assets/image.png";
import chatImg from "../../assets/image copy.png";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      {/* ✅ 헤더 추가 */}
      <Header />  

      {/* ✅ 메인 섹션 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 10%", // ✅ 패딩 축소
          gap: "50px",
          minHeight: "75vh", // ✅ 화면 높이에 맞게 조정
        }}
      >
        {/* 왼쪽 텍스트 */}
        <Box
          sx={{
            flex: 1,
            textAlign: "left",
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
              fontSize: "17px", //1. 글씨 크기 조정으로 윈도우  줄바꿈 문제 해결
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
            onClick={() => setIsLoginOpen(true)} // 로그인 모달 열기
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

      {/* ✅ 로그인 모달 */}
      <LoginModal
        open={isLoginOpen}
        handleClose={() => setIsLoginOpen(false)}
      />

      {/* ✅ Job is... 섹션 */}
      <Box
        sx={{
          minHeight: "64vh", // ✅ 화면 높이에 맞게 조정
          padding: "110px 10%", // ✅ 패딩 축소
          backgroundColor: "#F9F9F9",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // ✅ 왼쪽 정렬
          gap: "85px",
        }}
      >
        {/* 상단 설명 (왼쪽 정렬) */}
        <Box sx={{ textAlign: "left", maxWidth: "600px" }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              color: "var(--reflow-work-cod-gray, var(--color-grey-8, #151514))",
              fontFamily: "var(--font-family-Font-1, Inter)",
              fontSize: "var(--font-size-48, 48px)",
              fontStyle: "normal",
              fontWeight: "var(--font-weight-800, 800)",
              lineHeight: "var(--line-height-66, 66px)", // 137.5%
            }}
          >          
            Job is <span style={{ color: "#AA2217" }}>...</span>
          </Typography>

          <Typography
            variant="h6"
            color="textSecondary"
            sx={{
              color: "var(--www-figma-com-black, var(--color-black-solid, #000))",
              textAlign: "center",
              fontFamily: "var(--font-family-Font-1, Menlo)",
              fontSize: "var(--font-size-18, 18px)",
              fontStyle: "normal",
              fontWeight: "var(--font-weight-400, 400)",
              lineHeight: "var(--line-height-23_4, 23.4px)", // 130%
              letterSpacing: "var(--letter-spacing-0_54, 0.54px)",
              textTransform: "uppercase",
            }}
          >
            JOBIS, 어떤 사람들에게 더 유용한가요?
          </Typography>

        </Box>

        {/* 카드 리스트 (정렬 수정) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: "50px",
          }}
        >
          {/* 무직 카드 */}
          <Box
            sx={{
              textAlign: "center",
              width: "374.45px", // ✅ 피그마 width 반영
              height: "292px", // ✅ 피그마 height 반영
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={unemployedImg}
              alt="무직"
              style={{ width: "120px", height: "200px", marginBottom: "10px" }}
            />
            <Typography variant="h6" fontWeight="bold">
              무직
            </Typography>
            <Typography variant="body1" color="textSecondary">
              혼자서 모의 면접을 대비하기가 힘들어요. <br />제 모의 답변에 대해
              자세한 피드백과 조언을 받고 싶어요.
            </Typography>
          </Box>

          {/* 직장인 카드 */}
          <Box
            sx={{
              textAlign: "center",
              width: "374.45px",
              height: "292px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={workerImg}
              alt="직장인"
              style={{ width: "153px", height: "200px", marginBottom: "10px" }}
            />{" "}
            <Typography variant="h6" fontWeight="bold">
              직장인
            </Typography>
            <Typography variant="body1" color="textSecondary">
              매 직군에 지원할 때마다 이력서를 매번 변경하고 <br />
              수정하고 또 저장하는 게 지겨워요.
            </Typography>
          </Box>

          {/* 학생 카드 */}
          <Box
            sx={{
              textAlign: "center",
              width: "374.45px",
              height: "292px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={studentImg}
              alt="학생"
              style={{ width: "153px", height: "200px", marginBottom: "10px" }}
            />
            <Typography variant="h6" fontWeight="bold">
              학생
            </Typography>
            <Typography variant="body1" color="textSecondary">
              제가 그동안 연습했던 면접들을 기록해서 저장하고 싶은데, <br />
              어떻게 해야 할 지 모르겠어요.
            </Typography>
          </Box>
        </Box>

{/* ✅ AI 피드백 섹션 추가 */}
<Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    width: "100%",
    minHeight: "767.2px", // ✅ 피그마 height 반영
    background: "#FADCA2",
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // ✅ 패딩 추가
    marginTop: '100px',
  }}
>
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: "center",
      gap: "70px",
    }}
  >
    {/* 왼쪽 텍스트 섹션 */}
    <Box
      sx={{
        width: "480px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="800"
        sx={{
          color: "#151514",
          fontSize: "48px",
          fontFamily: "Inter",
          fontWeight: '800',
          lineHeight: "66px",
        }}
      >
        보다 자세한 AI 피드백을 <br /> 손쉽게 매일 받아보세요.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          width: "446px",
          color: "#697485",
          fontSize: "16px",
          fontWeight: "400",
          fontFamily: "Inter",
          lineHeight: "24px",
        }}
      >
        대표 질문에 대해 최대 5개의 꼬리 질문을 제공하고,  <br />
        면접 상황을 현실감 있게 구현하여  <br />
        답변에 대한 상세 피드백을 받을 수 있습니다.
      </Typography>
    </Box>

    {/* 오른쪽 채팅방 캡쳐 이미지 */}
    <img
      src={chatImg}
      alt="AI 피드백"
      style={{
        width: "500px",
        height: "512px",
      }}
    />
  </Box>

  {/* 하단 따봉 */}
  <img
    src={goodImg}
    alt="작은 아이콘"
    style={{
      width: "200px",
      height: "200px",
      position: "absolute",
      left: "50%",
      bottom: "50px",
      transform: "translateX(-50%)", // ✅ 가운데 정렬
    }}
  />
</Box>

      </Box>
    </>
  );
};

export default Home;
