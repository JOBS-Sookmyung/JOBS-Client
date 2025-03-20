// loginmodal.js
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ open, handleClose, openSignup, setUser }) => {
  // 로그인 시 입력받은 id와 비밀번호 (백엔드에 보낼 값)
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 성공 후 특정 페이지로 이동하기 위해 useNavigate 사용
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async () => {
    try {
      // fetch로 백엔드( http://localhost:8000/login )에 POST 요청
      // body: { id, pw } 형태로
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, pw: password }),
      });
      const data = await response.json();

      // 백엔드에서 "Login success" 메시지가 오면 로그인 성공 처리
      if (data.message === "Login success") {
        // 1) localStorage에 user 정보 저장
        localStorage.setItem("user", JSON.stringify(data.user));
        // 2) setUser 함수를 이용해 상위 컴포넌트(예: Header)의 user 상태를 업데이트
        setUser(data.user);

        //alert("로그인 성공");

        // 모달 닫기
        handleClose();

        // SubHome 페이지로 이동
        navigate("/subhome");
      } else {
        alert("로그인 실패. 아이디 또는 비밀번호를 확인하세요.");
      }
    } catch (error) {
      console.error(error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent
        sx={{ padding: "32px", textAlign: "center", position: "relative" }}
      >
        {/* 모달 오른쪽 상단 닫기 버튼 */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* 로고 표시 */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <img src={logo} alt="JOBIS 로고" style={{ height: "40px" }} />
        </Box>

        {/* 아이디와 비밀번호 입력 필드 */}
        <Box display="flex" flexDirection="column" gap={2} mt={4}>
          <TextField
            fullWidth
            label="아이디"
            variant="outlined"
            value={id}
            onChange={(e) => setId(e.target.value)} // 입력 시 id 상태 업데이트
          />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 입력 시 password 상태 업데이트
          />
        </Box>

        {/* 아이디/비밀번호 찾기 버튼 (기능은 아직 미구현) */}
        <Box mt={1} textAlign="right">
          <Button variant="text" size="small" sx={{ color: "gray" }}>
            아이디·비밀번호 찾기
          </Button>
        </Box>

        {/* 로그인/회원가입 버튼 */}
        <Box mt={3} display="flex" flexDirection="column" gap={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
              height: "56px",
            }}
            onClick={handleLogin} // 로그인 버튼 클릭 시 handleLogin 실행
          >
            로그인
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderColor: "black",
              color: "black",
              fontWeight: "bold",
              height: "56px",
            }}
            onClick={openSignup} // 회원가입 클릭 시 회원가입 모달 열기
          >
            회원가입
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
