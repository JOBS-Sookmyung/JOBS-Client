import React from "react";
import ChatHeader from "../../component/ChatHeader";

const ChatSidebar = ({
  questions,
  selectedQuestionIndex,
  handleSelectQuestion,
  handleSelectHistory,
  showQuestions,
  setShowQuestions,
  showHistory,
  setShowHistory,
}) => {
  return (
    <div className="sidebar">
      <ChatHeader />
      <div className="section">
        <div
          className="section-header"
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
                className={`question-item ${
                  selectedQuestionIndex === index ? "selected" : ""
                }`}
                onClick={() => handleSelectQuestion(index)}
              >
                <span className="question-number">{index + 1}.</span>
                <span className="question-text">{q}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

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
          <div className="history-list">
            {/* 오래된 기록이 위쪽, 최신 기록이 아래쪽 */}
            <div
              className="question-item history-item"
              onClick={() => handleSelectHistory("1")}
            >
              <span>현대 모비스 모의 면접 기록</span>
            </div>
            <div
              className="question-item history-item"
              onClick={() => handleSelectHistory("2")}
            >
              <span>네이버 클라우드 모의 면접 기록</span>
            </div>
            {/* 추후 신규 이력서 등록 시, 예: /chat/3/1 형태의 새 history-item이 추가됩니다. */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
