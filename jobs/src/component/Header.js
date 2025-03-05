import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import logo from "../assets/logo.svg";

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [user, setUser] = useState({ name: "김숙명" }); // 로그인 연동 전 임시 데이터
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 연동 전이므로 주석 처리
    // const storedUser = localStorage.getItem("user");
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // }
  }, []);

  // 로그인 모달에서 회원가입 버튼 클릭 시 회원가입 모달 열기
  const handleOpenSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    // 로그인 연동 시 localStorage에서 사용자 정보 삭제 (현재는 주석 처리)
    // localStorage.removeItem("user");

    setUser(null);
    navigate("/"); // 로그아웃 후 메인홈(`/`)으로 이동
  };

  return (
    <>
      <AppBar
        position="sticky"
        style={{
          backgroundColor: "#fff",
          height: "88px",
          padding: "0 20px",
          boxShadow: "0px 2px 8px rgba(0, 0, 50, 0.1)",
        }}
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

          {/* 메인홈(`/`)에서는 로그인/회원가입 버튼, 다른 페이지에서는 사용자 이름 + 로그아웃 버튼 */}
          <div>
            {location.pathname === "/" ? (
              <>
                <Button
                  variant="outlined"
                  style={{
                    marginRight: "15px",
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
              </>
            ) : user ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "30px" }}
              >
                <span style={{ fontWeight: "bold", color: "#020202" }}>
                  {" "}
                  {/* 김숙명 있는 위치*/}
                  {user.name}
                </span>

                {/* 채워진 버튼 스타일 --> contained*/}
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "#020202",
                    color: "#fff",
                  }}
                >
                  로그아웃
                </Button>
              </div>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>

      {/* 로그인 모달 */}
      <LoginModal
        open={loginOpen}
        handleClose={() => setLoginOpen(false)}
        openSignup={handleOpenSignup}
        setUser={setUser} // 로그인 연동 시 사용
      />

      {/* 회원가입 모달 */}
      <SignupModal open={signupOpen} handleClose={() => setSignupOpen(false)} />
    </>
  );
};

export default Header;
