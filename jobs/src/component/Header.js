import React, { useState } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import logo from "../assets/logo.svg";

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <>
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

          {/* 로그인 / 회원가입 버튼 */}
          <div>
            <Button
              variant="outlined"
              style={{
                marginRight: "10px",
                borderColor: "#020202",
                color: "#020202",
              }}
              onClick={() => setLoginOpen(true)}
            >
              로그인
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#020202", color: "#fff" }}
              onClick={() => setSignupOpen(true)}
            >
              회원가입
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* 로그인 모달 */}
      <LoginModal open={loginOpen} handleClose={() => setLoginOpen(false)} />

      {/* 회원가입 모달 */}
      <SignupModal open={signupOpen} handleClose={() => setSignupOpen(false)} />
    </>
  );
};

export default Header;
