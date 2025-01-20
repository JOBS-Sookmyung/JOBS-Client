import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const question = location.state?.question || "질문을 선택하세요."; // 기본 질문 설정
  const [showQuestions, setShowQuestions] = useState(true);
  const [showHistory, setShowHistory] = useState(true);
  const [messages, setMessages] = useState([
    {
      type: "question",
      text: "프로젝트에서 협업 경험이 있다면, 어떤 역할을 맡았고 어떻게 팀워크를 이끌었나요?",
    },
    {
      type: "ai-response",
      text: "이 프로젝트는 팀원들 각각의 강점을 최대한 활용하는 게 중요했던 작업이었는데요...",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [hints, setHints] = useState({});

  // PDF 내보내기 함수
  const handleExportPDF = () => {
    alert("PDF로 변환하는 기능이 구현됩니다.");
  };

  // 힌트 버튼 클릭 처리
  const handleHint = (index) => {
    const hintResponse =
      "이 질문에 대한 답변은 경험 중심으로 구체적으로 작성하는 것이 좋습니다.";
    setHints({ ...hints, [index]: hintResponse });
  };

  // 사용자 입력 처리
  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      setMessages([...messages, { type: "user", text: userInput }]);
      setUserInput("");
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* 왼쪽 사이드바 */}
      <div className="col-3 border-end bg-light">
        {/* 대표 질문 영역 */}
        <div className="p-3 border-bottom">
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => setShowQuestions(!showQuestions)}
          >
            <h5 className="mb-0">
              대표 질문들{" "}
              <span className="text-muted small">
                ({showQuestions ? "5개" : ""})
              </span>
            </h5>
            <button className="btn btn-sm btn-outline-secondary">
              {showQuestions ? "▼" : "▶"}
            </button>
          </div>
          {showQuestions && (
            <ul className="list-unstyled mt-3">
              <li className="p-2 rounded hover-bg-light">프로젝트 협업 경험</li>
              <li className="p-2 rounded hover-bg-light">본인의 강점과 약점</li>
              <li className="p-2 rounded hover-bg-light">입사 후 5년 뒤</li>
              <li className="p-2 rounded hover-bg-light">갈등 상황 해결</li>
              <li className="p-2 rounded hover-bg-light">
                본인이 생각하는 곳 장점이란?
              </li>
            </ul>
          )}
        </div>

        {/* 이전 기록 영역 */}
        <div className="p-3">
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => setShowHistory(!showHistory)}
          >
            <h5 className="mb-0">
              이전 기록들{" "}
              <span className="text-muted small">
                ({showHistory ? "8개" : ""})
              </span>
            </h5>
            <button className="btn btn-sm btn-outline-secondary">
              {showHistory ? "▼" : "▶"}
            </button>
          </div>
          {showHistory && (
            <ul className="list-unstyled mt-3">
              <li className="p-2 rounded hover-bg-light">
                현대 모비스 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                네이버 클라우드 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                넥슨 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                구글 코리아 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                애플 코리아 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                마이크로소프트 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                하나은행 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                실리콘밸리 모의 면접 기록
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* 오른쪽 채팅 영역 */}
      <div className="col-9 d-flex flex-column">
        {/* 상단 내보내기 버튼 */}
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0">당근마켓 모의 면접</h5>
          <button className="btn btn-success" onClick={handleExportPDF}>
            내보내기
          </button>
        </div>

        {/* 채팅 메시지 출력 영역 */}
        <div className="flex-grow-1 p-3 bg-white overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-3 ${message.type === "user" ? "text-end" : ""}`}
            >
              <p
                className={`p-3 rounded ${
                  message.type === "user"
                    ? "bg-success text-white"
                    : message.type === "ai-response"
                      ? "bg-light"
                      : "bg-primary text-white"
                }`}
              >
                {message.text}
              </p>
              {message.type === "question" && (
                <button
                  className="btn btn-sm btn-outline-secondary mt-2"
                  onClick={() => handleHint(index)}
                >
                  힌트
                </button>
              )}
              {hints[index] && (
                <p className="mt-2 text-muted small">{hints[index]}</p>
              )}
            </div>
          ))}
        </div>

        {/* 하단 입력창 */}
        <div className="p-3 border-top d-flex align-items-center">
          <input
            type="text"
            className="form-control me-3"
            placeholder="답변을 입력하세요..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
