import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
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
  );
};

export default Header;
