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
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const sessionToken = searchParams.get("session_token");

    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedSessionToken, setSelectedSessionToken] = useState(sessionToken);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [currentQuestionType, setCurrentQuestionType] = useState("main_question");
    const [shouldRefreshSidebar, setShouldRefreshSidebar] = useState(false);

    // 로컬 스토리지에서 user를 가져오는 useEffect
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // 로컬 스토리지에서 이력서 파일명 가져오기
    const resumeFileName = localStorage.getItem("resumeFileName");

    // 파일명에서 확장자를 제거하고 " 면접 준비"를 추가하는 함수
    const getDisplayTitle = (filename) => {
        if (!filename) return "면접 준비";
        const dotIndex = filename.lastIndexOf(".");
        const nameWithoutExt = dotIndex !== -1 ? filename.substring(0, dotIndex) : filename;
        return `${nameWithoutExt} 면접 준비`;
    };

    const fetchChatData = useCallback(async (token) => {
        if (!token) return;

        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:8000/chat/${token}`);
            if (!response.ok) {
                throw new Error("채팅 데이터를 가져오는데 실패했습니다.");
            }
            const data = await response.json();

            // 메시지 중복 제거 (순서 유지)
            const uniqueMessages = data.messages.reduce((acc, current) => {
                const exists = acc.some((msg) => msg.type === current.type && msg.text === current.text);
                if (!exists) {
                    acc.push(current);
                }
                return acc;
            }, []);

            setMessages(uniqueMessages);

            // 대표질문만 필터링 (중복 제거)
            const mainQuestions = [...new Set(uniqueMessages.filter((msg) => msg.type === "main_question").map((msg) => msg.text))];
            setQuestions(mainQuestions);

            // 마지막 메시지 타입 설정
            if (uniqueMessages.length > 0) {
                const lastMessage = uniqueMessages[uniqueMessages.length - 1];
                setCurrentQuestionType(lastMessage.type);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                { type: "error", text: "채팅 데이터를 가져오는데 실패했습니다." },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const startChat = useCallback(async () => {
        if (!user) {
            console.error("User is not available");
            return;
        }

        if (!sessionToken) {
            try {
                const pdfToken = searchParams.get("token");
                if (!pdfToken) {
                    console.error("PDF 토큰이 없습니다.");
                    return;
                }

                const response = await fetch(`http://localhost:8000/chat/start/${pdfToken}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pdf_token: pdfToken,
                        user_id: user.id, // 유저 아이디
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "채팅 시작에 실패했습니다.");
                }

                const data = await response.json();
                const newSessionToken = data.session_token;
                setSelectedSessionToken(newSessionToken);

                await fetchChatData(newSessionToken);
                navigate(`/chat?session_token=${newSessionToken}`, { replace: true });

                setShouldRefreshSidebar(true);
            } catch (error) {
                console.error("채팅 시작 오류:", error);
                setMessages((prev) => [
                    ...prev,
                    { type: "error", text: "채팅 시작에 실패했습니다." },
                ]);
            }
        } else {
            setSelectedSessionToken(sessionToken);
            await fetchChatData(sessionToken);
        }
    }, [user, sessionToken, navigate, fetchChatData, searchParams]);

    useEffect(() => {
        if (user) {
            startChat();
        }
    }, [startChat, user]);

    const handleSelectSession = (token) => {
        setSelectedSessionToken(token);
        fetchChatData(token);
    };

    const handleInputChange = (e) => {
        if (typeof e === "string") {
            setUserInput(e);
        } else if (e && e.target && e.target.value !== undefined) {
            setUserInput(e.target.value);
        }
    };

    const handleSendMessage = async () => {
        if (!userInput.trim() || !selectedSessionToken) return;

        const currentInput = userInput;
        try {
            setIsLoading(true);
            setUserInput("");

            // 사용자 메시지 즉시 표시
            const userMessage = { type: "user_answer", text: currentInput };
            setMessages((prev) => [...prev, userMessage]);

            // 답변 제출 및 피드백 받기
            const response = await fetch(`http://localhost:8000/chat/answer/${selectedSessionToken}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ answer: currentInput }),
            });

            if (!response.ok) {
                throw new Error("답변 제출 실패");
            }

            const data = await response.json();
            if (data.feedback) {
                setMessages((prev) => [
                    ...prev,
                    { type: "feedback", text: data.feedback },
                ]);
            }

            // 꼬리질문 요청
            const followUpResponse = await fetch(`http://localhost:8000/chat/follow-up/${selectedSessionToken}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ previous_answer: currentInput }),
            });

            if (followUpResponse.ok) {
                const followUpData = await followUpResponse.json();
                if (followUpData.question) {
                    const newMessage = {
                        type: followUpData.type,
                        text: followUpData.question,
                    };
                    setMessages((prev) => [...prev, newMessage]);
                    setCurrentQuestionType(followUpData.type);

                    if (followUpData.type === "main_question") {
                        setQuestions((prev) => [...prev, followUpData.question]);
                        setSelectedQuestionIndex((prev) => prev + 1);
                        setShouldRefreshSidebar(true);
                    }
                } else if (followUpData.type === "completed") {
                    setMessages((prev) => [
                        ...prev,
                        { type: "system", text: "모든 질문이 완료되었습니다." },
                    ]);
                    setShouldRefreshSidebar(true);
                }
            }
        } catch (error) {
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
            {user ? (
                <>
                    <ChatSidebar
                        selectedSessionToken={selectedSessionToken}
                        handleSelectSession={handleSelectSession}
                        shouldRefresh={shouldRefreshSidebar}
                        onRefreshComplete={() => setShouldRefreshSidebar(false)}
                        user={user}
                    />
                    <div className="chat-section">
                        <div className="chat-header">
                            <h5 className="chat-title">{getDisplayTitle(resumeFileName)}</h5>
                            <button className="export-button" onClick={handleExportPDF}>
                                내보내기
                            </button>
                        </div>
                        <ChatBody messages={messages} />
                        <ChatInput
                            userInput={userInput}
                            setUserInput={setUserInput}
                            loading={isLoading}
                            handleSendMessage={handleSendMessage}
                        />
                    </div>
                </>
            ) : (
                <p>사용자 정보 로딩 중...</p>
            )}
        </div>
    );
};

export default Chat;
