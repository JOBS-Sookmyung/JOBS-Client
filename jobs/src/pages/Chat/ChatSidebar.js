import React from "react";
import ChatHeader from "../../component/ChatHeader"; // component 폴더가 src/component 에 있다면 이렇게

const ChatSidebar = ({
  questions,
  selectedQuestionIndex,
  handleSelectQuestion,
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
                {q}
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
  );
};

export default ChatSidebar;
