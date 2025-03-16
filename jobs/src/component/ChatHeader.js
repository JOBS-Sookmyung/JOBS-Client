import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.svg";

const ChatHeader = () => {
  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: "#F9F9F9",
        height: "80px",
        padding: "0 20px",
        boxShadow: "0px 0px 0px rgba(0, 0, 50, 0.1)",
      }}
    >
      <Toolbar
        style={{
          minHeight: "88px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* ✅ 로고 클릭 시 subhome 이동 */}
        <Link to="/subhome" style={{ textDecoration: "none" }}>
          <img
            src={logo}
            alt="JOBIS 로고"
            style={{
              maxHeight: "50px",
              width: "100%",
              height: "auto",
              maxWidth: "209px",
            }}
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;
