import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import logo from "../assets/logo.svg";

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  // 로그인 연동 전 임시값이 아니라, 로그인 성공 시 로컬 스토리지에서 받아오도록 수정
  // 원래: const [user, setUser] = useState({ name: "김숙명" });
  // 수정: 초기값을 null 등으로 두고, useEffect에서 localStorage 값을 불러옴
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 원래 주석 처리되어 있던 부분을 해제해서 로그인 직후 저장된 user 정보를 가져오게 함
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // localStorage에서 가져온 문자열을 객체로 파싱해 setUser
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 로그인 모달에서 "회원가입" 버튼 클릭 시 작동
  const handleOpenSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    // localStorage에서 사용자 정보를 삭제
    localStorage.removeItem("user");
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

          {/* 메인홈(`/`)에서는 로그인/회원가입 버튼, 
              다른 페이지에서는 사용자 이름 + 로그아웃 버튼 */}
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
              // user가 존재하면 user.name 표시
              <div
                style={{ display: "flex", alignItems: "center", gap: "30px" }}
              >
                <span style={{ fontWeight: "bold", color: "#020202" }}>
                  {user.name}님
                </span>
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
        setUser={setUser} 
      />

      {/* 회원가입 모달 */}
      <SignupModal open={signupOpen} handleClose={() => setSignupOpen(false)} />
    </>
  );
};

export default Header;
