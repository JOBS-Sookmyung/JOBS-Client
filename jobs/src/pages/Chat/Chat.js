import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatHeader from "../../component/ChatHeader";
import "./Chat.css";

const Chat = () => {
  const navigate = useNavigate();
  const { questionId } = useParams(); // ✅ URL에서 questionId 가져오기

  // ✅ 실제 API 응답을 받아올 경우 (현재는 주석 처리)
  // const questions = location.state?.questions || [];

  // ✅ 임시 데이터로 설정 (테스트용)
  const questions = ["질문1", "질문2", "질문3", "질문4", "질문5"];

  // 선택한 질문의 인덱스 가져오기
  const selectedIndex = questionId ? parseInt(questionId) - 1 : null;

  // ✅ 상태 설정
  const [selectedQuestionIndex, setSelectedQuestionIndex] =
    useState(selectedIndex);
  const [showQuestions, setShowQuestions] = useState(true);
  const [showHistory, setShowHistory] = useState(true);
  const [messages, setMessages] = useState([]); // 첫 화면에서는 빈 배열 유지
  const [userInput, setUserInput] = useState("");
  const [hints, setHints] = useState({});
  const [loadingHints, setLoadingHints] = useState({}); // 힌트 로딩 상태
  const textAreaRef = useRef(null);

  // 질문 선택 처리 (기본 질문 5가지)
  const handleSelectQuestion = async (index) => {
    setSelectedQuestionIndex(index);
    navigate(`/chat/1/${index + 1}`, { state: { questions } });

    // 질문만 먼저 추가 (AI 응답 없이)
    setMessages([{ type: "question", text: questions[index] }]);

    try {
      const response = await fetch("http://localhost:8080/generate-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questions[index] }),
      });

      if (!response.ok) throw new Error("서버 응답 오류");

      const data = await response.json();

      // AI 응답을 따로 추가
      setMessages((prevMessages) => [
        ...prevMessages, // 기존 메시지 유지 (질문만 있는 상태)
        { type: "ai-response", text: data.answer }, // AI 응답 추가
      ]);
    } catch (error) {
      console.error("AI 응답 오류:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai-response", text: "AI 응답을 가져오는 데 실패했습니다." },
      ]);
    }
  };

  // 꼬리질문 전송
  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    const userMessage = { type: "user", text: userInput };
    const aiLoadingMessage = {
      type: "ai-response",
      text: "AI가 답변을 생성 중입니다...",
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      aiLoadingMessage,
    ]);
    setUserInput("");

    // 2초 후 AI 응답 추가
    setTimeout(async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/generate-response",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userInput }),
          }
        );

        if (!response.ok) throw new Error("서버 응답 오류");

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), // 마지막 "AI가 답변을 생성 중입니다..." 제거
          { type: "ai-response", text: data.answer },
        ]);
      } catch (error) {
        console.error("AI 응답 오류:", error);
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { type: "ai-response", text: "AI 응답을 가져오는 데 실패했습니다." },
        ]);
      }
    }, 2000);
  };

  // ✅ 힌트 요청 (AI에 질문 전달 후 가이드 받기)
  const handleHint = async (index) => {
    if (hints[index]) return; // 이미 힌트가 있다면 중복 요청 방지

    setLoadingHints((prev) => ({ ...prev, [index]: true })); // 로딩 상태 업데이트

    try {
      const response = await fetch("http://localhost:8080/generate-hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questions[index] }),
      });

      if (!response.ok) throw new Error("서버 응답 오류");

      const data = await response.json();
      setHints((prev) => ({ ...prev, [index]: data.hint })); // AI가 반환한 힌트 저장
    } catch (error) {
      console.error("힌트 요청 실패:", error);
      setHints((prev) => ({
        ...prev,
        [index]: "힌트를 가져오는 데 실패했습니다.",
      })); // 에러 처리
    } finally {
      setLoadingHints((prev) => ({ ...prev, [index]: false })); // 로딩 종료
    }
  };

  // PDF 내보내기 함수
  const handleExportPDF = () => {
    const content = document.querySelector(".chat-body");
    const chatTitle = document.querySelector(".chat-title")?.innerText.trim();

    if (!content) {
      alert("내보낼 콘텐츠를 찾을 수 없습니다."); // 요소가 없으면 경고창 표시
      return;
    }

    // 대표질문을 chat-title에서 가져오기
    const filteredContent = Array.from(content.children)
      .filter(
        (message) =>
          !message.classList.contains("hint-text") && // 힌트 제거
          !message.classList.contains("hint-button") // 힌트 버튼 제거
      )
      .map((message, index, arr) => {
        const text = message.innerText.trim();
        let result = "";

        // 대표질문
        if (message.classList.contains("question")) {
          return ""; // 기존 question은 출력 안 함
        }

        // 사용자 답변 (B2 크기) + 구분선 추가
        if (message.classList.contains("user")) {
          result += `<p class="user">${text}</p>`;
          result += `<div class="divider"></div>`; // 구분선 추가
        }

        // 꼬리질문 (H5 크기)
        if (
          message.classList.contains("ai-response") &&
          text.startsWith("꼬리질문:")
        ) {
          result += `<h5 class="follow-up-question">${text.replace(
            "꼬리질문:",
            ""
          )}</h5>`;
        }

        // 일반 AI 응답 (기본 스타일)
        if (message.classList.contains("ai-response")) {
          result += `<p class="ai-response">${text}</p>`;
        }

        return result;
      })
      .join("");

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>면접 기록</title>
          <style>
            @import url('https://cdn.jsdelivr.net/npm/pretendard/dist/web/static/pretendard.css');
            
            body { 
              padding: 20px; 
              font-family: 'Pretendard', sans-serif;
              text-align: left; /* ✅ 전체 텍스트 왼쪽 정렬 */
            }
            h2 { text-align: center; }
            .message { 
              margin-bottom: 15px; 
              padding: 10px; 
              border-radius: 5px; 
            }
            .question { 
              font-size: 18px; /* ✅ H4 크기 */
              font-weight: bold;
              color: #1E293B;
            }
            .follow-up-question { 
              font-size: 16px; /* ✅ H5 크기 */
              font-weight: bold;
              color: #374151;
            }
            .user { 
              font-size: 14px; /* ✅ B2 크기 */
              font-weight: 500;
              color: #084032;
              margin-bottom: 20px; /* ✅ 구분선과 간격 */
            }
            .ai-response { 
              background: #d1fae5; 
              padding: 10px; 
              color: var(--Gray-80, #1E293B); 
              font-family: "Pretendard", sans-serif;
              font-size: 14px; 
              font-style: normal;
            }
            /* ✅ 사용자 답변 후 구분선 추가 */
            .divider {
              width: 80%;
              height: 1px;
              background-color: #E5E7EB; /* 연한 회색 */
              margin: 20px 0; /* ✅ 위아래 간격 20px */
            }
          </style>
        </head>
        <body>
          <h2>면접 기록</h2>
          <h4 class="question">${chatTitle}</h4>
          ${filteredContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // 입력창 자동 높이 조절 함수
  const handleInputChange = (e) => {
    setUserInput(e.target.value);

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "24px"; // ✅ 최소 높이 초기화
      if (e.target.value.trim() === "") {
        textAreaRef.current.style.height = "24px"; // ✅ 입력이 없으면 최소 높이 유지
      } else {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = `${Math.max(
          24,
          Math.min(textAreaRef.current.scrollHeight, 100)
        )}px`;
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // ✅ 기본 Enter 동작(줄바꿈) 방지
      handleSendMessage(); // ✅ 메시지 전송
    }
  };

  return (
    <div className="chat-container">
      {/* 왼쪽 사이드바 */}
      <div className="sidebar">
        <ChatHeader />
        {/* 예상 질문 영역 */}
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
          <button
            className="export-button flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-full hover:bg-gray-100"
            onClick={handleExportPDF}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.8125 11.25V16.25C17.8125 16.4986 17.7137 16.7371 17.5379 16.9129C17.3621 17.0887 17.1236 17.1875 16.875 17.1875H3.125C2.87636 17.1875 2.6379 17.0887 2.46209 16.9129C2.28627 16.7371 2.1875 16.4986 2.1875 16.25V11.25C2.1875 11.0014 2.28627 10.7629 2.46209 10.5871C2.6379 10.4113 2.87636 10.3125 3.125 10.3125C3.37364 10.3125 3.6121 10.4113 3.78791 10.5871C3.96373 10.7629 4.0625 11.0014 4.0625 11.25V15.3125H15.9375V11.25C15.9375 11.0014 16.0363 10.7629 16.2121 10.5871C16.3879 10.4113 16.6264 10.3125 16.875 10.3125C17.1236 10.3125 17.3621 10.4113 17.5379 10.5871C17.7137 10.7629 17.8125 11.0014 17.8125 11.25ZM9.33672 11.9133C9.42382 12.0007 9.52731 12.07 9.64126 12.1173C9.75522 12.1647 9.87739 12.189 10.0008 12.189C10.1242 12.189 10.2463 12.1647 10.3603 12.1173C10.4743 12.07 10.5777 12.0007 10.6648 11.9133L13.7898 8.78828C13.966 8.61216 14.0649 8.37329 14.0649 8.12422C14.0649 7.87515 13.966 7.63628 13.7898 7.46016C13.6137 7.28404 13.3749 7.18509 13.1258 7.18509C12.8767 7.18509 12.6378 7.28404 12.4617 7.46016L10.9375 8.98438V2.5C10.9375 2.25136 10.8387 2.0129 10.6629 1.83709C10.4871 1.66127 10.2486 1.5625 10 1.5625C9.75136 1.5625 9.5129 1.66127 9.33709 1.83709C9.16127 2.0129 9.0625 2.25136 9.0625 2.5V8.98438L7.53828 7.46172C7.45108 7.37451 7.34755 7.30534 7.23361 7.25814C7.11967 7.21095 6.99755 7.18665 6.87422 7.18665C6.62515 7.18665 6.38628 7.2856 6.21016 7.46172C6.12295 7.54892 6.05377 7.65245 6.00658 7.76639C5.95938 7.88033 5.93509 8.00245 5.93509 8.12578C5.93509 8.37485 6.03404 8.61372 6.21016 8.78984L9.33672 11.9133Z"
                fill="#084032"
              />
            </svg>
            <span className="text-green-900 font-bold text-sm">내보내기</span>
          </button>
        </div>

        {/* 질문이 선택되지 않은 경우 */}
        {selectedQuestionIndex === null && (
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
                      disabled={loadingHints[index]}
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 39,
                          height: 16,
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: 4,
                          display: "inline-flex",
                        }}
                      >
                        <div
                          style={{
                            color: "#475569",
                            fontSize: 12,
                            fontFamily: "Plus Jakarta Sans",
                            fontWeight: "500",
                            lineHeight: 16,
                            wordWrap: "break-word",
                          }}
                        >
                          힌트
                        </div>
                        <div data-svg-wrapper style={{ position: "relative" }}>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.14439 4.15141L2.94439 8.27641C2.8392 8.37976 2.69763 8.43767 2.55017 8.43767C2.40271 8.43767 2.26114 8.37976 2.15595 8.27641L0.355952 6.50876C0.303228 6.45699 0.261217 6.39534 0.232318 6.32733C0.20342 6.25933 0.188198 6.1863 0.187523 6.11241C0.186161 5.96319 0.244133 5.81953 0.348686 5.71305C0.400456 5.66033 0.462103 5.61832 0.530108 5.58942C0.598114 5.56052 0.671145 5.5453 0.745033 5.54462C0.894256 5.54326 1.03791 5.60123 1.14439 5.70579L2.55064 7.08672L6.35642 3.34891C6.46284 3.24436 6.60643 3.18636 6.75561 3.18768C6.90479 3.189 7.04734 3.24952 7.15189 3.35594C7.25644 3.46236 7.31444 3.60595 7.31312 3.75513C7.3118 3.90431 7.25128 4.04686 7.14486 4.15141H7.14439ZM11.6514 3.35454C11.5996 3.30163 11.5379 3.25947 11.4698 3.23048C11.4017 3.20148 11.3285 3.18622 11.2544 3.18557C11.1804 3.18492 11.107 3.19888 11.0384 3.22667C10.9697 3.25446 10.9073 3.29552 10.8545 3.34751L7.05017 7.08672L6.6808 6.72391C6.57438 6.61936 6.43078 6.56136 6.2816 6.56268C6.13243 6.564 5.98988 6.62453 5.88533 6.73094C5.78077 6.83736 5.72278 6.98095 5.7241 7.13013C5.72541 7.27931 5.78594 7.42186 5.89236 7.52641L6.65595 8.27641C6.76114 8.37976 6.90271 8.43767 7.05017 8.43767C7.19763 8.43767 7.3392 8.37976 7.44439 8.27641L11.6444 4.15141C11.6971 4.09964 11.7391 4.038 11.7679 3.97001C11.7968 3.90201 11.812 3.829 11.8127 3.75513C11.8133 3.68127 11.7994 3.608 11.7717 3.5395C11.7441 3.47101 11.7032 3.40864 11.6514 3.35594V3.35454Z"
                              fill="#475569"
                            />
                          </svg>
                        </div>
                      </div>
                    </button>
                  )}
                  <p>{message.text}</p>
                  {hints[index] && <p className="hint-text">{hints[index]}</p>}
                </div>
              ))}
            </div>

            {/* 입력창 */}
            <div className="chat-input">
              <textarea
                ref={textAreaRef}
                className="input-field"
                placeholder="🧠   당황하지 말고, 침착하게 답해주세요."
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // ✅ Enter와 Shift+Enter 동작 추가
              />

              <button className="send-button" onClick={handleSendMessage}>
                <div data-svg-wrapper>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="40" height="40" rx="20" fill="#084032" />
                    <path
                      d="M25.9853 19.2626L25.9853 19.2626L21.1581 14.4354L21.0781 14.3554V14.4685V28.2498C21.0781 28.5357 20.9645 28.81 20.7623 29.0121C20.5601 29.2143 20.2859 29.3279 20 29.3279C19.714 29.3279 19.4398 29.2143 19.2376 29.0121C19.0354 28.81 18.9218 28.5357 18.9218 28.2498V14.4685V14.3554L18.8418 14.4354L14.0128 19.2626L14.0128 19.2626C13.8102 19.4651 13.5355 19.5789 13.249 19.5789C12.9626 19.5789 12.6878 19.4651 12.4853 19.2626C12.2827 19.06 12.1689 18.7853 12.1689 18.4989C12.1689 18.2124 12.2827 17.9377 12.4853 17.7351L19.2353 10.9851L19.2353 10.9851C19.3355 10.8846 19.4545 10.8048 19.5856 10.7504C19.7166 10.696 19.8571 10.668 19.999 10.668C20.1409 10.668 20.2814 10.696 20.4125 10.7504C20.5435 10.8048 20.6625 10.8846 20.7627 10.9851L20.7628 10.9851L27.5128 17.7351L27.5128 17.7352C27.6133 17.8353 27.6931 17.9544 27.7475 18.0854C27.8019 18.2165 27.8299 18.357 27.8299 18.4989C27.8299 18.6408 27.8019 18.7813 27.7475 18.9123C27.6931 19.0433 27.6133 19.1624 27.5128 19.2625L27.5127 19.2626C27.4125 19.3632 27.2935 19.4429 27.1625 19.4973C27.0314 19.5517 26.8909 19.5797 26.749 19.5797C26.6071 19.5797 26.4666 19.5517 26.3356 19.4973C26.2045 19.4429 26.0855 19.3632 25.9853 19.2626Z"
                      fill="white"
                      stroke="white"
                      stroke-width="0.09375"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
