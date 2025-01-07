import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import "./NotFound.css";

const NotFound = () => {
  return (
    <Container className="not-found-container">
      <Typography variant="h3" className="not-found-title">
        404 - 페이지를 찾을 수 없습니다
      </Typography>
      <Typography variant="body1" className="not-found-description">
        요청하신 페이지가 존재하지 않거나 잘못된 URL입니다.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        className="not-found-home-button"
      >
        홈으로 돌아가기
      </Button>
    </Container>
  );
};

export default NotFound;
