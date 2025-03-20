import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatSidebar from "./ChatSidebar";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { handleExportPDF } from "./pdfExport";
import "./Chat.css";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const sessionToken = searchParams.get("session_token");

  const [messages, setMessages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const fetchChatData = useCallback(async () => {
    if (!sessionToken) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8000/chat/?session_token=${sessionToken}`
      );
      if (!response.ok) {
        throw new Error("채팅 데이터를 가져오는데 실패했습니다.");
      }
      const data = await response.json();

      // 메시지 중복 제거 (순서 유지)
      const uniqueMessages = data.messages.reduce((acc, current) => {
        const exists = acc.some(
          (msg) => msg.type === current.type && msg.text === current.text
        );
        if (!exists) {
          acc.push(current);
        }
        return acc;
      }, []);

      setMessages(uniqueMessages);

      // 대표질문만 필터링 (중복 제거)
      const mainQuestions = [
        ...new Set(
          uniqueMessages
            .filter((msg) => msg.type === "main_question")
            .map((msg) => msg.text)
        ),
      ];
      setQuestions(mainQuestions);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "error", text: "채팅 데이터를 가져오는데 실패했습니다." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionToken]);

  const startChat = useCallback(async () => {
    if (!sessionToken) {
      try {
        const pdfToken = searchParams.get("token");
        console.log("PDF Token:", pdfToken);

        if (!pdfToken) {
          console.error("PDF 토큰이 없습니다.");
          return;
        }

        const response = await fetch(
          `http://localhost:8000/chat/start/${pdfToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "채팅 시작에 실패했습니다.");
        }

        const data = await response.json();
        console.log("Chat Start Response:", data);
        navigate(`/chat?session_token=${data.session_token}`);
      } catch (error) {
        console.error("채팅 시작 오류:", error);
      }
    } else {
      await fetchChatData();
    }
  }, [sessionToken, navigate, fetchChatData, searchParams]);

  useEffect(() => {
    startChat();
  }, [startChat]);

  const handleSelectMainQuestion = (index) => {
    setSelectedQuestionIndex(index);
  };

  const handleInputChange = (e) => {
    if (typeof e === "string") {
      setUserInput(e);
    } else if (e && e.target && e.target.value !== undefined) {
      setUserInput(e.target.value);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const currentInput = userInput;
    try {
      setIsLoading(true);
      setUserInput("");

      // 사용자 메시지 즉시 표시
      const userMessage = { type: "user_answer", text: currentInput };
      setMessages((prev) => [...prev, userMessage]);

      // 답변 제출 및 피드백 받기
      const response = await fetch(
        `http://localhost:8000/chat/answer/${sessionToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer: currentInput }),
        }
      );

      if (!response.ok) {
        throw new Error("답변 제출 실패");
      }

      const data = await response.json();
      console.log("피드백 응답:", data);

      // 피드백 추가
      if (data.feedback) {
        setMessages((prev) => [
          ...prev,
          { type: "feedback", text: data.feedback },
        ]);
      }

      // 꼬리질문 요청
      const followUpResponse = await fetch(
        `http://localhost:8000/chat/follow-up/${sessionToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ previous_answer: currentInput }),
        }
      );

      if (followUpResponse.ok) {
        const followUpData = await followUpResponse.json();
        console.log("질문 응답:", followUpData);

        if (followUpData.question) {
          // 응답 타입에 따라 다르게 처리
          if (followUpData.type === "main_question") {
            setMessages((prev) => [
              ...prev,
              { type: "main_question", text: followUpData.question },
            ]);
          } else if (followUpData.type === "follow_up") {
            setMessages((prev) => [
              ...prev,
              { type: "follow_up", text: followUpData.question },
            ]);
          }
        }
      }
    } catch (error) {
      console.error("API 오류:", error);
      setMessages((prev) => [
        ...prev,
        { type: "error", text: "오류가 발생했습니다." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <ChatSidebar
        questions={questions}
        selectedQuestionIndex={selectedQuestionIndex}
        handleSelectMainQuestion={handleSelectMainQuestion}
        showQuestions={showQuestions}
        setShowQuestions={setShowQuestions}
        sessionToken={sessionToken}
      />

      <div className="chat-section">
        <div className="chat-header">
          <h5 className="chat-title">
            {questions.length > 0
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
            <ChatBody messages={messages} />

            <ChatInput
              userInput={userInput}
              setUserInput={setUserInput}
              handleSendMessage={handleSendMessage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
