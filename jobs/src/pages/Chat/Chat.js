import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Chat.css";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 예상 질문 리스트 (Input.js에서 받아옴)
  const questions = location.state?.questions || [];

  // 상태 관리
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null); // 사용자가 선택한 질문 (기본값: 선택되지 않음)
  const [showQuestions, setShowQuestions] = useState(true); // 질문 리스트 토글
  const [showHistory, setShowHistory] = useState(true); // 이전 기록 토글
  const [messages, setMessages] = useState([]); // 채팅 메시지
  const [userInput, setUserInput] = useState(""); // 사용자 입력값
  const [hints, setHints] = useState({}); // 힌트 저장

  // 질문 선택 처리
  const handleSelectQuestion = (index) => {
    setSelectedQuestionIndex(index);
    setMessages([
      { type: "question", text: questions[index] },
      { type: "ai-response", text: "AI가 답변을 생성 중입니다..." },
    ]);
    navigate(`/chat/1/${index + 1}`, { state: { question: questions[index] } });
  };

  // 메시지 전송
  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    setMessages([...messages, { type: "user", text: userInput }]);
    setUserInput("");
  };

  // 힌트 버튼 클릭 처리
  const handleHint = (index) => {
    setHints({
      ...hints,
      [index]:
        "이 질문에 대한 답변은 경험 중심으로 구체적으로 작성하는 것이 좋습니다.",
    });
  };

  // PDF 내보내기 함수
  const handleExportPDF = () => {
    const content = document.querySelector(".chat-body");
    if (!content) {
      alert("내보낼 콘텐츠를 찾을 수 없습니다."); // 요소가 없으면 경고창 표시
      return;
    }

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
    <html>
      <head>
        <title>면접 기록</title>
        <style>
          body { padding: 20px; font-family: Arial, sans-serif; }
          .message { margin-bottom: 15px; padding: 10px; border-radius: 5px; }
          .question { background: #007bff; color: white; }
          .ai-response { background: #d1fae5; }
          .user { text-align: right; background: #28a745; color: white; }
        </style>
      </head>
      <body>
        <h2>면접 기록</h2>
        ${content.innerHTML} <!-- content가 null이 아닐 때만 실행 -->
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="chat-container">
      {/* 왼쪽 사이드바 */}
      <div className="sidebar">
        {/* 예상 질문 영역 */}
        <div className="section">
          <div
            className="section-header"
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => setShowQuestions(!showQuestions)}
          >
            <h5 className="section-title">예상 질문</h5>
            <span className="toggle-button">{showQuestions ? "▼" : "▶"}</span>
          </div>

          {showQuestions && (
            <ul className="question-list">
              {questions.map((q, index) => (
                <li
                  key={index}
                  className={`question-item ${selectedQuestionIndex === index ? "selected" : ""}`}
                  onClick={() => handleSelectQuestion(index)}
                >
                  {q}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 이전 기록 영역 */}
        <div className="section">
          <div
            className="section-header"
            style={{ cursor: "pointer" }}
            onClick={() => setShowHistory(!showHistory)}
          >
            <h5 className="section-title">이전 기록</h5>
            <span className="toggle-button">{showHistory ? "▼" : "▶"}</span>
          </div>
          {showHistory && (
            <ul className="history-list">
              <li className="history-item">현대 모비스 모의 면접 기록</li>
              <li className="history-item">네이버 클라우드 모의 면접 기록</li>
              <li className="history-item">넥슨 모의 면접 기록</li>
              <li className="history-item">구글 코리아 모의 면접 기록</li>
              <li className="history-item">애플 코리아 모의 면접 기록</li>
              <li className="history-item">마이크로소프트 모의 면접 기록</li>
              <li className="history-item">하나은행 모의 면접 기록</li>
              <li className="history-item">실리콘밸리 모의 면접 기록</li>
            </ul>
          )}
        </div>
      </div>

      {/* 오른쪽 채팅 영역 */}
      <div className="chat-section">
        {/* 상단 내보내기 버튼 */}
        <div className="chat-header">
          <h5 className="chat-title">
            {selectedQuestionIndex !== null
              ? questions[selectedQuestionIndex]
              : "예상 질문을 선택해주세요!"}
          </h5>
          <button className="export-button" onClick={handleExportPDF}>
            내보내기
          </button>
        </div>

        {/* 질문이 선택되지 않은 경우 */}
        {!selectedQuestionIndex && (
          <div className="chat-placeholder">
            <h3>예상 질문을 통해 면접 준비를 시작해보세요!</h3>
          </div>
        )}

        {/* 질문이 선택된 경우 채팅 진행 */}
        {selectedQuestionIndex !== null && (
          <>
            <div className="chat-body">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  {message.type === "question" && (
                    <button
                      className="hint-button"
                      onClick={() => handleHint(index)}
                    >
                      힌트
                    </button>
                  )}
                  <p>{message.text}</p>
                  {hints[index] && <p className="hint-text">{hints[index]}</p>}
                  {message.type === "user" && (
                    <div className="user-actions">
                      <button className="action-button">꼬리질문</button>
                      <button className="action-button">피드백</button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 입력창 */}
            <div className="chat-input">
              <input
                type="text"
                className="input-field"
                placeholder="답변을 입력하세요..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <button className="send-button" onClick={handleSendMessage}>
                ⬆
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
