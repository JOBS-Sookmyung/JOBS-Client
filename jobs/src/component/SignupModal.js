// signup.js
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
  // 회원가입 입력값 상태
  const [userId, setUserId] = useState("");
  const [pw, setPw] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");

  const [languageTests, setLanguageTests] = useState([
    { id: Date.now(), type: "", score: "" },
  ]);

  const addLanguageTest = () => {
    setLanguageTests([
      ...languageTests,
      { id: Date.now(), type: "", score: "" },
    ]);
  };

  const removeLanguageTest = (id) => {
    if (languageTests.length === 1) {
      setLanguageTests([{ id: Date.now(), type: "", score: "" }]);
    } else {
      setLanguageTests(languageTests.filter((test) => test.id !== id));
    }
  };

  const handleLanguageChange = (id, field, value) => {
    setLanguageTests(
      languageTests.map((test) =>
        test.id === id ? { ...test, [field]: value } : test
      )
    );
  };

  // 회원가입 버튼 클릭 시 API 호출
  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          pw: pw,
          name: userName,
          school: school,
          phone: phone,
        }),
      });
      const data = await response.json();

      if (data.message === "Signup success") {
        alert("회원가입 성공!");
        handleClose(); // 회원가입 모달 닫기
      } else {
        alert("이미 존재하는 아이디입니다.");
      }
    } catch (error) {
      console.error(error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            variant="outlined"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <TextField
            fullWidth
            label="이름"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            fullWidth
            label="전화번호"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="학교명"
              variant="outlined"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
            <TextField fullWidth label="전공명" variant="outlined" />
          </Box>

          {languageTests.map((test) => (
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
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          ))}

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
            onClick={handleSignup}
          >
            회원가입
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
