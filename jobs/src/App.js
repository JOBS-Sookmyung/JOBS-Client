import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Home from "./pages/Home/Home";
import SubHome from "./pages/SubHome/SubHome";
import Chat from "./pages/Chat/Chat";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subhome" element={<SubHome />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:historyId/:questionId" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
