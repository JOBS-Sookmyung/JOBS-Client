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

const LoginModal = ({ open, handleClose, openSignup, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 처리 함수
  const handleLogin = () => {
    // 실제 로그인 API 연동 필요 (현재는 가짜 데이터 사용)
    const userData = { name: "김숙명" }; // 로그인한 사용자 정보

    // localStorage에 사용자 정보 저장
    localStorage.setItem("user", JSON.stringify(userData));

    // Header.js에서도 사용자 정보 업데이트
    setUser(userData);

    // 로그인 모달 닫기
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent
        sx={{ padding: "32px", textAlign: "center", position: "relative" }}
      >
        {/* 닫기 버튼 */}
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

        {/* 로고 */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <img src={logo} alt="JOBIS 로고" style={{ height: "40px" }} />
        </Box>

        {/* 아이디 & 비밀번호 입력 필드 */}
        <Box display="flex" flexDirection="column" gap={2} mt={4}>
          <TextField
            fullWidth
            label="아이디"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* 아이디/비밀번호 찾기 */}
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
            onClick={handleLogin} // 로그인 클릭 시 실행
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
            onClick={openSignup} // 회원가입 모달 열기
          >
            회원가입
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
