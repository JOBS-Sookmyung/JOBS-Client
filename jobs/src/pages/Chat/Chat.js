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
          <button className="export-button">내보내기</button>
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
