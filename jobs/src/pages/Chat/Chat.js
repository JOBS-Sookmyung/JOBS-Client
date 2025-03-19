import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatSidebar from "./ChatSidebar";
import ChatBody from "./ChatBody";
//import ChatInput from "./ChatInput";
import "./Chat.css";

const Chat = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const sessionToken = searchParams.get("session_token");

    const [messages, setMessages] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [showQuestions, setShowQuestions] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState('');

    const fetchChatData = useCallback(async () => {
        if (!sessionToken) return;
        
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:8000/chat/?session_token=${sessionToken}`);
            if (!response.ok) {
                throw new Error('채팅 데이터를 가져오는데 실패했습니다.');
            }
            const data = await response.json();
            
            // 메시지 중복 제거 (순서 유지)
            const uniqueMessages = data.messages.reduce((acc, current) => {
                const exists = acc.some(msg => 
                    msg.type === current.type && 
                    msg.text === current.text
                );
                if (!exists) {
                    acc.push(current);
                }
                return acc;
            }, []);
            
            setMessages(uniqueMessages);
            
            // 대표질문만 필터링 (중복 제거)
            const mainQuestions = [...new Set(
                uniqueMessages
                    .filter(msg => msg.type === "main_question")
                    .map(msg => msg.text)
            )];
            setQuestions(mainQuestions);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { type: "error", text: "채팅 데이터를 가져오는데 실패했습니다." }]);
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

                const response = await fetch(`http://localhost:8000/chat/start/${pdfToken}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                
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
        if (typeof e === 'string') {
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
            setUserInput('');

            // 사용자 메시지 즉시 표시
            const userMessage = { type: "user_answer", text: currentInput };
            setMessages(prev => [...prev, userMessage]);

            // 답변 제출 및 피드백 받기
            const response = await fetch(`http://localhost:8000/chat/answer/${sessionToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answer: currentInput }),
            });

            if (!response.ok) {
                throw new Error('답변 제출 실패');
            }

            const data = await response.json();
            console.log('피드백 응답:', data);

            // 피드백 추가
            if (data.feedback) {
                setMessages(prev => [...prev, { type: "feedback", text: data.feedback }]);
            }

            // 꼬리질문 요청
            const followUpResponse = await fetch(`http://localhost:8000/chat/follow-up/${sessionToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ previous_answer: currentInput })
            });

            if (followUpResponse.ok) {
                const followUpData = await followUpResponse.json();
                console.log('질문 응답:', followUpData);

                if (followUpData.question) {
                    // 응답 타입에 따라 다르게 처리
                    if (followUpData.type === "main_question") {
                        setMessages(prev => [...prev, { type: "main_question", text: followUpData.question }]);
                    } else if (followUpData.type === "follow_up") {
                        setMessages(prev => [...prev, { type: "follow_up", text: followUpData.question }]);
                    }
                }
            }

        } catch (error) {
            console.error('API 오류:', error);
            setMessages(prev => [...prev, { type: "error", text: "오류가 발생했습니다." }]);
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
            <div className="chat-main">
                <ChatBody 
                    messages={messages} 
                    loading={isLoading}
                    userInput={userInput}
                    onInputChange={handleInputChange}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;
