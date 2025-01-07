// Chat.js
import React, { useState } from "react";
import "./Chat.css";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const [showQuestions, setShowQuestions] = useState(true);
  const [showHistory, setShowHistory] = useState(true);

  // Get selected question from navigation state
  const location = useLocation();
  const selectedQuestion = location.state?.question || "질문 제목 없음";

  const toggleQuestions = () => setShowQuestions(!showQuestions);
  const toggleHistory = () => setShowHistory(!showHistory);

  return (
    <div className="chat-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="section">
          <div className="section-header">
            <h3>대표 질문들</h3>
            <div className="controls">
              <span>5개</span>
              <button onClick={toggleQuestions}>
                {showQuestions ? "숨기기" : "보이기"}
              </button>
            </div>
          </div>
          {showQuestions && (
            <ul className="question-list">
              <li>프로젝트 협업 경험</li>
              <li>본인의 강점과 약점</li>
              <li>입사 후 5년 뒤</li>
              <li>갈등 상황 해결</li>
              <li>본인이 생각하는 곳 장점이란?</li>
            </ul>
          )}
        </div>

        <div className="section">
          <div className="section-header">
            <h3>이전 기록들</h3>
            <div className="controls">
              <span>8개</span>
              <button onClick={toggleHistory}>
                {showHistory ? "숨기기" : "보이기"}
              </button>
            </div>
          </div>
          {showHistory && (
            <ul className="history-list">
              <li>현대 모비스 모의 면접 기록</li>
              <li>네이버 클라우드 모의 면접 기록</li>
              <li>넥슨 모의 면접 기록</li>
              <li>구글 코리아 모의 면접 기록</li>
              <li>애플 코리아 모의 면접 기록</li>
              <li>마이크로소프트 모의 면접 기록</li>
              <li>하나은행 모의 면접 기록</li>
              <li>실리콘밸리 모의 면접 기록</li>
            </ul>
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        <div className="chat-header">
          <h2>{selectedQuestion}</h2>
          <button className="export-button">내보내기</button>
        </div>
        <div className="chat-body">
          <div className="message">프로젝트에서 어떤 역할을 맡았고...</div>
          <div className="message">우선 팀원들과...</div>
          {/* 채팅 메시지들이 여기에 추가될 예정 */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
