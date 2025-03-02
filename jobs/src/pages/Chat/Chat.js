import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./Chat.css";

const Chat = () => {
  const location = useLocation();
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
  const [messages, setMessages] = useState(
    selectedIndex !== null
      ? [
          { type: "question", text: questions[selectedIndex] },
          { type: "ai-response", text: "AI가 답변을 생성 중입니다..." },
        ]
      : []
  );
  const [userInput, setUserInput] = useState("");
  const [hints, setHints] = useState({});
  const [loadingHints, setLoadingHints] = useState({}); // 힌트 로딩 상태

  // 질문 선택 처리
  const handleSelectQuestion = (index) => {
    setSelectedQuestionIndex(index);
    setMessages([
      { type: "question", text: questions[index] },
      { type: "ai-response", text: "AI가 답변을 생성 중입니다..." },
    ]);
    navigate(`/chat/1/${index + 1}`, { state: { questions } });
  };

  // 메시지 전송
  const handleSendMessage = () => {
    if (userInput.trim() === "") return;
    setMessages([...messages, { type: "user", text: userInput }]);
    setUserInput("");
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
            .question { background: #007bff; color: white; padding: 10px; }
            .ai-response { background: #d1fae5; padding: 10px; }
            .user { text-align: right; background: #28a745; color: white; padding: 10px; border-radius: 8px; }
          </style>
        </head>
        <body>
          <h2>면접 기록</h2>
          ${content.innerHTML} <!-- ✅ HTML 콘텐츠 추가 -->
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
                    >
                      {loadingHints[index] ? "로딩 중..." : "힌트"}
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
                placeholder=" 🧠   당황하지 말고, 침착하게 답해주세요."
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
