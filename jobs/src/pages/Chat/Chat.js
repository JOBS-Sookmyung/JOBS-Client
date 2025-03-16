import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatSidebar from "./ChatSidebar";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { handleExportPDF } from "./pdfExport";
import "./Chat.css";

const Chat = () => {
  const navigate = useNavigate();
  const { historyId, questionId } = useParams();
  // historyId가 없으면 기본값으로 2(예시로 2개의 기존 기록이 있다고 가정)
  const initialHistoryCount = historyId ? parseInt(historyId) : 2;
  const [historyCount, setHistoryCount] = useState(initialHistoryCount);
  const selectedIndex = questionId ? parseInt(questionId) - 1 : null;

  // ✅ FastAPI에서 대표질문 가져오기
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] =
    useState(selectedIndex);
  const [showQuestions, setShowQuestions] = useState(true);
  const [showHistory, setShowHistory] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [hints, setHints] = useState({});
  const [loadingHints, setLoadingHints] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("📡 대표질문 요청 중...");
        const response = await fetch("http://localhost:8000/chat", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("서버 응답 오류");

        const data = await response.json();
        console.log("✅ 대표질문 수신:", data.question);
        setQuestions([data.question]);

        // ✅ 대표질문이 설정되면 자동으로 첫 질문 추가
        setMessages([{ type: "question", text: data.question }]);
        setSelectedQuestionIndex(0);
      } catch (error) {
        console.error("🚨 대표질문 가져오기 실패:", error);
        // ✅ 서버 연결 실패 시 테스트 데이터 사용
        const testQuestion =
          "React의 가상 DOM(Virtual DOM)에 대해 설명해주세요.";
        console.log("✅ 테스트 데이터 사용:", testQuestion);
        setQuestions([testQuestion]);
        setMessages([{ type: "question", text: testQuestion }]);
        setSelectedQuestionIndex(0);
      }
    };

    setTimeout(fetchQuestions, 500);
  }, []);

  // ✅ 대표질문 선택 및 채팅 시작
  // URL은 /chat/{historyCount}/{questionIndex} 형태로 이동
  const handleSelectQuestion = async (index) => {
    if (questions.length === 0) return;
    setSelectedQuestionIndex(index);
    navigate(`/chat/${historyCount}/${index + 1}`, { state: { questions } });
    setMessages([{ type: "question", text: questions[index] }]);
  };

  // 사용자 질문 전송 (loading 상태이면 중복 전송 방지)
  const handleSendMessage = async () => {
    if (loading) return;
    if (userInput.trim() === "") return;
    setLoading(true);

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

    try {
      console.log("📡 사용자 질문 전송:", userInput);
      const response = await fetch("http://localhost:8000/chat/q", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
        body: new URLSearchParams({ answer: userInput }),
      });

      if (!response.ok) throw new Error("서버 응답 오류");

      const data = await response.json();
      console.log("✅ AI 응답 수신:", data.answer);
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { type: "ai-response", text: data.answer },
      ]);
    } catch (error) {
      console.error("🚨 AI 응답 오류:", error);
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { type: "error", text: "❌ AI 응답을 가져오는 데 실패했습니다." },
      ]);
    } finally {
      setUserInput("");
      setLoading(false);
    }
  };

  // ✅ 힌트 요청 (AI에 질문 전달 후 가이드 받기)
  const handleHint = async (index) => {
    if (hints[index]) return;

    setLoadingHints((prev) => ({ ...prev, [index]: true }));

    try {
      const response = await fetch("http://localhost:8000/generate-hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questions[index] }),
      });

      if (!response.ok) throw new Error("서버 응답 오류");

      const data = await response.json();
      setHints((prev) => ({ ...prev, [index]: data.hint }));
    } catch (error) {
      console.error("힌트 요청 실패:", error);
      setHints((prev) => ({
        ...prev,
        [index]: "힌트를 가져오는 데 실패했습니다.",
      }));
    } finally {
      setLoadingHints((prev) => ({ ...prev, [index]: false }));
    }
  };

  // ✅ history-item 선택 시 서버에서 해당 채팅방 데이터를 받아오는 함수
  // 임의의 API 엔드포인트 형식: /chat/history/{newHistoryId}
  const handleSelectHistory = async (newHistoryId) => {
    console.log("History item clicked, newHistoryId:", newHistoryId);
    // 임시로 서버 요청 코드를 주석 처리하고 바로 페이지 이동하도록 합니다.
    // 추후 서버 연동 시 아래 fetch 코드를 활성화하고, 서버에서 historyCount, 채팅 데이터를 받아오도록 수정하세요.
    /*
    try {
      const response = await fetch(`http://localhost:8000/chat/history/${newHistoryId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("채팅 이력 요청 실패");
      const data = await response.json();
      setQuestions(data.questions || []);
      setMessages(data.messages || []);
      setSelectedQuestionIndex(0);
      if (data.historyCount) {
        setHistoryCount(data.historyCount);
      } else {
        setHistoryCount(parseInt(newHistoryId));
      }
      navigate(`/chat/${newHistoryId}/1`, { state: { questions: data.questions } });
    } catch (error) {
      console.error("채팅 이력 불러오기 실패:", error);
    }
    */
    // 임시: 바로 페이지 이동
    navigate(`/chat/${newHistoryId}/1`);
  };

  return (
    <div className="chat-container">
      <ChatSidebar
        questions={questions}
        selectedQuestionIndex={selectedQuestionIndex}
        handleSelectQuestion={handleSelectQuestion}
        handleSelectHistory={handleSelectHistory}
        showQuestions={showQuestions}
        setShowQuestions={setShowQuestions}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
      />

      <div className="chat-section">
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

        {selectedQuestionIndex === null && (
          <div className="chat-placeholder">
            <h3>예상 질문을 통해 면접 준비를 시작해보세요!</h3>
          </div>
        )}

        {selectedQuestionIndex !== null && (
          <>
            <ChatBody
              messages={messages}
              hints={hints}
              loadingHints={loadingHints}
              handleHint={handleHint}
            />

            <ChatInput
              userInput={userInput}
              setUserInput={setUserInput}
              loading={loading}
              handleSendMessage={handleSendMessage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
