import React, { useState } from "react";
import axios from "axios";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InputModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null); // 이력서 파일 저장
  const [jobPostUrl, setJobPostUrl] = useState(""); // 공고 URL 저장

  const handleFileChange = (e) => {
    setResume(e.target.files[0]); // 파일 변경 시 state 업데이트
  };

  const handleUrlChange = (e) => {
    setJobPostUrl(e.target.value); // URL 입력 시 state 업데이트
  };

  const handleSubmit = async () => {
    if (!resume || !jobPostUrl) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", resume); // PDF 파일 추가
    formData.append("recruitUrl", jobPostUrl); // URL 추가

    try {
      const response = await axios.post(
        "http://localhost:8000/input/uploadfile/", // fastapi 서버랑 연동하는 endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, 
        }
      );

      console.log("백엔드 응답:", response.data);
      alert("파일 업로드 성공!");
      closeModal();
      navigate('/chat'); // Chat 페이지로 이동
    } catch (error) {
      console.error("파일 업로드 오류:", error);
      alert("파일 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <Modal
      open={true}
      onClose={closeModal}
      closeAfterTransition
      aria-labelledby="modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          이력서 제출 및 공고 URL 입력
        </Typography>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange} // 파일 선택 이벤트 핸들러
          style={{ marginBottom: "16px" }}
        />

        <TextField
          label="공고 URL"
          variant="outlined"
          fullWidth
          value={jobPostUrl}
          onChange={handleUrlChange} // URL 입력 이벤트 핸들러
          style={{ marginBottom: "16px" }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="secondary" onClick={closeModal}>
            취소
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit} // 버튼 클릭 시 `handleSubmit` 실행 -> 연동 
            disabled={!resume || !jobPostUrl}
          >
            시작하기
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default InputModal;
