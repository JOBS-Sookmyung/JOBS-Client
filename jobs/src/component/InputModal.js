import React, { useState } from "react";
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

  const handleSubmit = () => {
    // 여기서 이력서 파일과 URL을 처리하는 로직을 구현할 수 있습니다.
    if (resume && jobPostUrl) {
      // 백엔드로 파일과 URL 전송하는 로직
      console.log("이력서 파일:", resume);
      console.log("공고 URL:", jobPostUrl);
      closeModal(); // 모달 닫기
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
