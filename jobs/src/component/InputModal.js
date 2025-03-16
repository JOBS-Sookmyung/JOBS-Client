import React, { useState } from "react";
import axios from "axios";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

const InputModal = ({ closeModal, onRecommendationsReceived }) => {
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
    formData.append("file", resume);
    formData.append("recruitUrl", jobPostUrl);

    try {
      // 1. 파일 업로드
      const uploadResponse = await fetch('http://localhost:8000/input/uploadfile/', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.detail || '파일 업로드 실패');
      }

      const uploadData = await uploadResponse.json();
      
      // 2. 추천 시스템 호출
      const recommendResponse = await fetch(
        `http://localhost:8000/recommend/${uploadData.token}`,
        {
          credentials: 'include'
        }
      );

      if (!recommendResponse.ok) {
        const errorData = await recommendResponse.json();
        throw new Error(errorData.detail || '추천 시스템 요청 실패');
      }

      const recommendData = await recommendResponse.json();
      
      // 3. 모달 닫고 추천 결과 전달
      closeModal();
      onRecommendationsReceived(recommendData);

    } catch (error) {
      console.error('Error:', error);
      alert(error.message || '처리 중 오류가 발생했습니다.');
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
