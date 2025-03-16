import React from "react";
import { Link } from "react-router-dom";
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
          <div className="history-list">
            {/* history-item을 div로 감싸서 각각의 페이지로 이동하도록 수정 */}
            <div className="history-item">
              <Link to="/chat/1/1">현대 모비스 모의 면접 기록</Link>
            </div>
            <div className="history-item">
              <Link to="/chat/2/1">네이버 클라우드 모의 면접 기록</Link>
            </div>
            {/* 새로 만들어지는 페이지는 예시로 /chat/3/(questions) 로 연결될 예정 */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
