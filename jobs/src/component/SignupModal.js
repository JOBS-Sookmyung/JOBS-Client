import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo.svg";

const SignupModal = ({ open, handleClose }) => {
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

        {/* 로고 + 설명 */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <img src={logo} alt="JOBIS 로고" style={{ height: "40px" }} />
        </Box>

        {/* 입력 필드 */}
        <Box display="flex" flexDirection="column" gap={2} mt={4}>
          <TextField fullWidth label="아이디" variant="outlined" />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="비밀번호 확인"
            type="password"
            variant="outlined"
          />
          <TextField fullWidth label="이름" variant="outlined" />
          <TextField fullWidth label="전화번호" variant="outlined" />

          {/* 학력 선택 (선택 사항) */}
          <TextField fullWidth select label="학력 (선택)" variant="outlined">
            <MenuItem value="고등학교">고등학교</MenuItem>
            <MenuItem value="대학교(재학)">대학교(재학)</MenuItem>
            <MenuItem value="대학교(졸업)">대학교(졸업)</MenuItem>
            <MenuItem value="대학원(재학)">대학원(재학)</MenuItem>
            <MenuItem value="대학원(졸업)">대학원(졸업)</MenuItem>
          </TextField>

          {/* 어학 선택 (선택 사항) */}
          <TextField fullWidth select label="어학 (선택)" variant="outlined">
            <MenuItem value="토익">토익</MenuItem>
            <MenuItem value="토플">토플</MenuItem>
            <MenuItem value="오픽">오픽</MenuItem>
            <MenuItem value="텝스">텝스</MenuItem>
            <MenuItem value="기타">기타</MenuItem>
          </TextField>
        </Box>

        {/* 회원가입 버튼 */}
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
            회원가입
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
