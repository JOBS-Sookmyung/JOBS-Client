// Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ children }) => {
  return (
    <div>
      {/* 네비게이션 바 */}
      <AppBar
        position="sticky"
        style={{ backgroundColor: "#EEEDEC", height: "88px" }}
      >
        <Toolbar
          style={{
            minHeight: "88px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            style={{ fontWeight: "bold", fontSize: "28px" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "#1A1918" }}>
              JOB問JOB答
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 페이지별 콘텐츠 */}
      <main>{children}</main>
    </div>
  );
};

export default Navbar;
