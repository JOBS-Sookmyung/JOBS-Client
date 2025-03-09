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
// 추가: useNavigate 임포트
import { useNavigate } from "react-router-dom";

const LoginModal = ({ open, handleClose, openSignup, setUser }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // useNavigate 훅
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, pw: password }),
      });
      const data = await response.json();

      if (data.message === "Login success") {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        alert("로그인 성공");

        // 로그인 모달 닫기
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

        <Box display="flex" flexDirection="column" alignItems="center">
          <img src={logo} alt="JOBIS 로고" style={{ height: "40px" }} />
        </Box>

        <Box display="flex" flexDirection="column" gap={2} mt={4}>
          <TextField
            fullWidth
            label="아이디"
            variant="outlined"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Box mt={1} textAlign="right">
          <Button variant="text" size="small" sx={{ color: "gray" }}>
            아이디·비밀번호 찾기
          </Button>
        </Box>

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
            onClick={handleLogin}
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
            onClick={openSignup}
          >
            회원가입
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
