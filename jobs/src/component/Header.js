import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "#fff", height: "88px", padding: "0 20px" }}
    >
      <Toolbar
        style={{
          minHeight: "88px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* 로고 */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            src={logo}
            alt="JOBIS 로고"
            style={{ maxHeight: "70px", maxWidth: "180px", width: "90%" }}
          />
        </Link>

        {/* 로그인/회원가입 버튼 */}
        <div>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            style={{
              marginRight: "10px",
              borderColor: "#020202",
              color: "#020202",
            }}
          >
            로그인
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            style={{ backgroundColor: "#020202", color: "#fff" }}
          >
            회원가입
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
