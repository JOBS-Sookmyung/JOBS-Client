import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../component/Header";
import LoginModal from "../../component/LoginModal";
import logo from "../../assets/logo.svg";
import mainImage from "../../assets/main-image.png";
import unemployedImg from "../../assets/unemployed.png"; // 무직 이미지
import workerImg from "../../assets/worker.png"; // 직장인 이미지
import studentImg from "../../assets/student.png"; // 학생 이미지

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
          <Typography variant="h3" fontWeight="bold">
            Job is <span style={{ color: "#AA2217" }}>...</span>
          </Typography>
          <Typography variant="h6" color="textSecondary">
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
      </Box>
    </>
  );
};

export default Home;
