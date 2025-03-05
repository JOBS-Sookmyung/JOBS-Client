import React, { useState } from "react";
import axios from "axios";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

const InputModal = ({ closeModal }) => {
  const [resume, setResume] = useState(null); // 이력서 파일 상태
  const [jobPostUrl, setJobPostUrl] = useState(""); // 공고 URL 상태

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleUrlChange = (e) => {
    setJobPostUrl(e.target.value);
  };

  const handleSubmit = async () => {
  if (resume && jobPostUrl) {
    const formData = new FormData();
    formData.append("file", resume);
    formData.append("recruitUrl", jobPostUrl);

    try {
      // axios로 파일과 데이터를 백엔드로 전송
      const response = await axios.post(
        "http://localhost:8000/subhome", // FastAPI 엔드포인트 URL로 수정
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // 파일 전송을 위한 헤더 설정
          },
          withCredentials: true, // 쿠키를 전송하려면 이 옵션을 추가
        }
      );

      console.log("백엔드 응답:", response.data);

      // 업로드가 완료되면 받은 token을 이용해 추천 시스템 호출
      const token = response.data.token; // 백엔드에서 반환된 token 값을 사용
      const recommendationResponse = await axios.get(
        `http://your-api-url/recommend/${token}`, // 추천 시스템 엔드포인트
        { withCredentials: true } // 쿠키를 전송하려면 이 옵션을 추가하세요
      );

      console.log("추천 결과:", recommendationResponse.data);
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("파일 업로드 오류:", error);
      alert("파일 업로드 중 오류가 발생했습니다.");
    }
  } else {
    alert("모든 정보를 입력해주세요.");
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

        {/* 이력서 파일 업로드 */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ marginBottom: "16px" }}
        />

        {/* 공고 URL 입력 */}
        <TextField
          label="공고 URL"
          variant="outlined"
          fullWidth
          value={jobPostUrl}
          onChange={handleUrlChange}
          style={{ marginBottom: "16px" }}
        />

        {/* 버튼들 */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="secondary" onClick={closeModal}>
            취소
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!resume || !jobPostUrl} // 이력서와 URL이 없으면 비활성화
          >
            시작하기
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default InputModal;
