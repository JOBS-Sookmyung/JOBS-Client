import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const VideoInputModal = ({ closeModal, onRecommendationsReceived }) => {
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!resume) {
      alert("이력서를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", resume);
    formData.append("recruitUrl", "default");

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
      console.log("✅ 파일 업로드 성공:", uploadData);
      
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
      console.log("✅ 추천 영상 받기 성공:", recommendData);
      
      // 3. 추천 데이터를 부모 컴포넌트로 전달
      onRecommendationsReceived(recommendData);
      closeModal();

    } catch (error) {
      console.error('❌ 에러:', error);
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
          이력서로 맞춤 영상 추천받기
        </Typography>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ marginBottom: "16px" }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="secondary" onClick={closeModal}>
            취소
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!resume}
          >
            영상 추천받기
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default VideoInputModal;
