import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo.svg";

const LoginModal = ({ open, handleClose }) => {
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

        {/* 타이틀: 로고 & 설명 */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <img src={logo} alt="JOBIS 로고" style={{ height: "40px" }} />
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ mt: 2 }} // 로고와 간격 추가
          >
            나의 면접을 준비하는 방법
          </Typography>
        </Box>

        {/* 아이디 & 비밀번호 입력 필드 */}
        <Box display="flex" flexDirection="column" gap={2} mt={4}>
          <TextField fullWidth label="아이디" variant="outlined" />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            variant="outlined"
          />
        </Box>

        {/* 아이디/비밀번호 찾기 */}
        <Box mt={1} textAlign="right">
          <Button variant="text" size="small" sx={{ color: "gray" }}>
            아이디·비밀번호 찾기
          </Button>
        </Box>

        {/* ✅ 로그인/회원가입 버튼 - 높이 증가 */}
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
          >
            회원가입
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
