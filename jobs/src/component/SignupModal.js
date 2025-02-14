import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Box,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import logo from "../assets/logo.svg";

const SignupModal = ({ open, handleClose }) => {
  const [languageTests, setLanguageTests] = useState([
    { id: Date.now(), type: "", score: "" },
  ]);

  // 어학 추가 필드 함수
  const addLanguageTest = () => {
    setLanguageTests([
      ...languageTests,
      { id: Date.now(), type: "", score: "" },
    ]);
  };

  // 어학 삭제 필드 함수
  const removeLanguageTest = (id) => {
    if (languageTests.length === 1) {
      // 필드가 하나만 남아있다면 입력 내용만 초기화
      setLanguageTests([{ id: Date.now(), type: "", score: "" }]);
    } else {
      // 필드가 2개 이상이면 해당 항목 삭제
      setLanguageTests(languageTests.filter((test) => test.id !== id));
    }
  };

  // 입력값 변경 핸들러
  const handleLanguageChange = (id, field, value) => {
    setLanguageTests(
      languageTests.map((test) =>
        test.id === id ? { ...test, [field]: value } : test
      )
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
          <TextField fullWidth label="이름" variant="outlined" />
          <TextField fullWidth label="전화번호" variant="outlined" />

          {/* 학력 입력 (학교명 & 전공명) */}
          <Box display="flex" gap={2}>
            <TextField fullWidth label="학교명" variant="outlined" />
            <TextField fullWidth label="전공명" variant="outlined" />
          </Box>

          {/* 어학 (왼쪽: 선택 / 오른쪽: 점수 입력 + 삭제 버튼) */}
          {languageTests.map((test, index) => (
            <Box key={test.id} display="flex" gap={2} alignItems="center">
              <TextField
                select
                fullWidth
                label="어학 시험"
                variant="outlined"
                value={test.type}
                onChange={(e) =>
                  handleLanguageChange(test.id, "type", e.target.value)
                }
              >
                <MenuItem value="토익">토익</MenuItem>
                <MenuItem value="토플">토플</MenuItem>
                <MenuItem value="오픽">오픽</MenuItem>
                <MenuItem value="텝스">텝스</MenuItem>
                <MenuItem value="기타">기타</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="점수/등급"
                variant="outlined"
                value={test.score}
                onChange={(e) =>
                  handleLanguageChange(test.id, "score", e.target.value)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => removeLanguageTest(test.id)}
                        disabled={
                          languageTests.length === 1 &&
                          !test.type &&
                          !test.score
                        } // 입력값이 없고 필드가 하나만 남았을 때만 비활성화
                      >
                        <DeleteIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          ))}

          {/* 어학 추가 버튼 */}
          <Box display="flex" justifyContent="flex-start" mt={1}>
            <Button
              startIcon={<AddCircleOutlineIcon />}
              onClick={addLanguageTest}
              sx={{ color: "gray", fontWeight: "bold", textTransform: "none" }}
            >
              어학 추가
            </Button>
          </Box>
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
