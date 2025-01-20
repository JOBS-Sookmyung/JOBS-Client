import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questionId = [1, 2, 3, 4, 5];
  const question = location.state?.question || "질문을 선택하세요.";
  const [showQuestions, setShowQuestions] = useState(true);
  const [showHistory, setShowHistory] = useState(true);
  const [messages, setMessages] = useState(() => {
    // 각 질문 ID에 따른 초기 메시지 설정
    const initialMessages = {
      1: [
        {
          type: "question",
          text: "프로젝트에서 협업 경험이 있다면, 어떤 역할을 맡았고 어떻게 팀워크를 이끌었나요?",
        },
        {
          type: "ai-response",
          text: "이 프로젝트는 팀원들 각각의 강점을 최대한 활용하는 게 중요했던 작업이었는데요...",
        },
      ],
      2: [
        {
          type: "question",
          text: "본인의 강점과 약점은 무엇이며, 약점을 극복하기 위해 어떤 노력을 하고 있나요?",
        },
        {
          type: "ai-response",
          text: "저의 가장 큰 강점은 끈기 있게 목표를 향해 나아가는 것입니다...",
        },
      ],
      3: [
        {
          type: "question",
          text: "입사 후 5년 뒤, 본인이 회사에서 어떤 모습으로 성장해 있을 것 같나요?",
        },
        {
          type: "ai-response",
          text: "5년 후에는 회사의 핵심 인재로 성장하여...",
        },
      ],
      4: [
        {
          type: "question",
          text: "팀 프로젝트나 조직 생활에서 갈등 상황을 성공적으로 해결한 경험이 있나요?",
        },
        {
          type: "ai-response",
          text: "프로젝트 진행 중 팀원들과의 의견 충돌이 있었지만...",
        },
      ],
      5: [
        {
          type: "question",
          text: "본인이 생각하는 이 회사의 가장 큰 장점은 무엇인가요?",
        },
        {
          type: "ai-response",
          text: "귀사의 가장 큰 장점은 혁신적인 기술력과 함께...",
        },
      ],
    };
    // URL에서 questionId 파라미터 추출
    const pathSegments = window.location.pathname.split("/");
    const questionId = parseInt(pathSegments[pathSegments.length - 1]) || 1;

    // questionId에 해당하는 메시지만 초기값으로 설정
    if (initialMessages[questionId]) {
      return initialMessages[questionId];
    }
    // URL의 questionId에 따라 해당하는 메시지 반환
    const currentId = parseInt(window.location.pathname.split("/")[2]) || 1;
    return initialMessages[currentId] || initialMessages[1];
  });
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
              <li
                className="p-2 rounded hover-bg-light"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/chat/1/1");
                  window.location.reload();
                }}
              >
                <div>프로젝트 협업 경험</div>
              </li>
              <li
                className="p-2 rounded hover-bg-light"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/chat/1/2");
                  window.location.reload();
                }}
              >
                <div>본인의 강점과 약점</div>
              </li>
              <li
                className="p-2 rounded hover-bg-light"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/chat/1/3");
                  window.location.reload();
                }}
              >
                <div>입사 후 5년 뒤</div>
              </li>
              <li
                className="p-2 rounded hover-bg-light"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/chat/1/4");
                  window.location.reload();
                }}
              >
                <div>갈등 상황 해결</div>
              </li>
              <li
                className="p-2 rounded hover-bg-light"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/chat/1/5");
                  window.location.reload();
                }}
              >
                <div>본인이 생각하는 곳 장점이란?</div>
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
          <button
            className="btn btn-success"
            onClick={() => {
              const content = document.querySelector(
                ".flex-grow-1.p-3.bg-white"
              );
              const printWindow = window.open("", "", "width=800,height=600");
              printWindow.document.write(`
                <html>
                  <head>
                    <title>면접 기록</title>
                    <style>
                      body { padding: 20px; }
                      .message { margin-bottom: 15px; }
                      .question { background: #007bff; color: white; padding: 10px; border-radius: 5px; }
                      .response { background: #f8f9fa; padding: 10px; border-radius: 5px; }
                      .user { text-align: right; background: #28a745; color: white; padding: 10px; border-radius: 5px; }
                    </style>
                  </head>
                  <body>
                    <h2>면접 기록</h2>
                    ${content.innerHTML}
                  </body>
                </html>
              `);
              printWindow.document.close();
              printWindow.focus();
              printWindow.print();
              printWindow.close();
            }}
          >
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
