import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import ChatSidebar from "./ChatSidebar";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { handleExportPDF } from "./pdfExport";
import "./Chat.css";

const Chat = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessionToken = searchParams.get('token');
    const { historyId, questionId } = useParams();
    
    const initialHistoryCount = historyId ? parseInt(historyId) : 2;
    const [historyCount, setHistoryCount] = useState(initialHistoryCount);
    const selectedIndex = questionId ? parseInt(questionId) - 1 : null;

    const [questions, setQuestions] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(selectedIndex);
    const [showQuestions, setShowQuestions] = useState(true);
    const [showHistory, setShowHistory] = useState(true);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [hints, setHints] = useState({});
    const [loadingHints, setLoadingHints] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!sessionToken) {
                console.error("🚨 세션 토큰이 없습니다.");
                return;
            }

            try {
                console.log("📡 대표질문 요청 중...");
                const response = await fetch(`http://localhost:8000/chat?session_token=${sessionToken}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) throw new Error("서버 응답 오류");

                const data = await response.json();
                console.log("✅ 대표질문 수신:", data.questions);
                setQuestions(data.questions);

                // 첫 번째 질문이 있으면 자동으로 선택
                if (data.questions.length > 0) {
                    setMessages([{ type: "question", text: data.questions[0] }]);
                    setSelectedQuestionIndex(0);
                }
            } catch (error) {
                console.error("🚨 대표질문 가져오기 실패:", error);
            }
        };

        fetchQuestions();
    }, [sessionToken]);

    const handleSelectQuestion = async (index) => {
        if (questions.length === 0) return;
        setSelectedQuestionIndex(index);
        navigate(`/chat/${historyCount}/${index + 1}?token=${sessionToken}`, { 
            state: { questions } 
        });
        setMessages([{ type: "question", text: questions[index] }]);
    };

    const handleSelectHistory = (historyId) => {
        navigate(`/chat/${historyId}/1?token=${sessionToken}`);
    };

    const handleSendMessage = async () => {
        if (loading || !sessionToken) return;
        if (userInput.trim() === "") return;
        setLoading(true);

        const userMessage = { type: "user", text: userInput };
        const aiLoadingMessage = {
            type: "ai-response",
            text: "AI가 답변을 생성 중입니다...",
        };

        setMessages((prevMessages) => [...prevMessages, userMessage, aiLoadingMessage]);

        try {
            console.log("📡 사용자 질문 전송:", userInput);
            const response = await fetch(`http://localhost:8000/chat/answer/${sessionToken}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ answer: userInput }),
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

    const handleHint = async (index) => {
        if (hints[index] || !sessionToken) return;

        setLoadingHints((prev) => ({ ...prev, [index]: true }));

        try {
            const response = await fetch(`http://localhost:8000/chat/hint/${sessionToken}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
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
                        {selectedQuestionIndex !== null ? questions[selectedQuestionIndex] : "예상 질문을 선택해주세요!"}
                    </h5>
                    <button className="export-button" onClick={handleExportPDF}>내보내기</button>
                </div>

                {selectedQuestionIndex === null ? (
                    <div className="chat-placeholder">
                        <h3>예상 질문을 통해 면접 준비를 시작해보세요!</h3>
                    </div>
                ) : (
                    <>
                        <ChatBody messages={messages} hints={hints} loadingHints={loadingHints} handleHint={handleHint} />
                        <ChatInput userInput={userInput} setUserInput={setUserInput} loading={loading} handleSendMessage={handleSendMessage} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Chat;
