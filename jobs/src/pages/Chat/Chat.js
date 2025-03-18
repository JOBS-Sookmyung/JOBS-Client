import React, { useState, useEffect, useCallback } from "react";
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

    // fetchMainQuestions를 useCallback으로 감싸서 메모이제이션
    const fetchMainQuestions = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/chat?session_token=${sessionToken}`);
            
            if (!response.ok) {
                throw new Error('대표질문을 가져오는데 실패했습니다.');
            }

            const data = await response.json();
            console.log("서버에서 받은 질문들:", data.questions); // 디버깅용 로그
            
            // questions 상태 업데이트
            setQuestions(data.questions);
            
            // messages 상태 업데이트
            const questionMessages = data.questions.map(question => ({
                type: 'bot',
                text: question,
                isFollowUp: false
            }));

            setMessages(questionMessages);
        } catch (error) {
            console.error('대표질문 로딩 오류:', error);
        } finally {
            setLoading(false);
        }
    }, [sessionToken]);

    // 의존성 배열에 fetchMainQuestions와 sessionToken 추가
    useEffect(() => {
        if (sessionToken) {
            fetchMainQuestions();
        }
    }, [fetchMainQuestions, sessionToken]);

    const handleSelectQuestion = async (index) => {
        if (questions.length === 0) {
            console.log("질문이 없습니다:", questions); // 디버깅용 로그
            return;
        }
        console.log("선택된 질문:", questions[index]); // 디버깅용 로그
        setSelectedQuestionIndex(index);
        navigate(`/chat/${historyCount}/${index + 1}?token=${sessionToken}`, { 
            state: { questions } 
        });
        setMessages([{ type: "bot", text: questions[index] }]);
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
            console.log("📡 사용자 답변 전송:", userInput);
            const response = await fetch(`http://localhost:8000/chat/answer/${sessionToken}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ answer: userInput }),
            });

            if (!response.ok) throw new Error("서버 응답 오류");

            const data = await response.json();
            console.log("✅ AI 응답 수신:", data);
            
            // 피드백과 꼬리질문을 포함한 메시지 배열 생성
            const newMessages = [
                ...messages.slice(0, -1), // 이전 메시지들
                userMessage, // 사용자 답변
                { type: "feedback", text: data.feedback }, // 피드백
                { type: "follow-up", text: data.follow_up } // 꼬리질문
            ];
            
            setMessages(newMessages);
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

    // 힌트 요청 핸들러
    const handleHint = async (questionIndex, isFollowUp) => {
        try {
            console.log(`힌트 요청 - 질문 인덱스: ${questionIndex + 1}, 히스토리: ${historyId}, 추가질문 여부: ${isFollowUp}`);
            
            const response = await fetch(
                `http://localhost:8000/chat/hint/${historyId}/${questionIndex + 1}?is_follow_up=${isFollowUp}&session_token=${sessionToken}`
            );

            if (!response.ok) {
                throw new Error(`힌트 생성 실패: ${response.status}`);
            }

            const data = await response.json();
            console.log(`힌트 생성 성공:`, data.hint);
            
            // 힌트 상태 업데이트
            setHints(prev => ({
                ...prev,
                [`${historyId}-${questionIndex}`]: data.hint // 각 질문에 대한 힌트를 독립적으로 저장
            }));
            
            return data.hint;
        } catch (error) {
            console.error('힌트 생성 오류:', error);
            return null;
        }
    };

    const handleEndSession = useCallback(async () => {
        if (!sessionToken) return;

        try {
            const response = await fetch(`http://localhost:8000/chat/end/${sessionToken}`, {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) throw new Error("서버 응답 오류");

            const data = await response.json();
            
            // 브라우저 콘솔에 세션 정보 출력
            console.log("📊 세션 정보:");
            console.log("   - 토큰:", data.session_info.token);
            console.log("   - 시작 시간:", data.session_info.start_time);
            console.log("   - 종료 시간:", data.session_info.end_time);
            
            // 세션 종료 후 처리 (예: 홈으로 이동)
            navigate("/");
        } catch (error) {
            console.error("세션 종료 중 오류 발생:", error);
        }
    }, [sessionToken, navigate]);

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
                    <div className="header-buttons">
                        <button className="export-button" onClick={handleExportPDF}>내보내기</button>
                        <button className="end-session-button" onClick={handleEndSession}>세션 종료</button>
                    </div>
                </div>

                {selectedQuestionIndex === null ? (
                    <div className="chat-placeholder">
                        <h3>예상 질문을 통해 면접 준비를 시작해보세요!</h3>
                    </div>
                ) : (
                    <>
                        <ChatBody 
                            messages={messages} 
                            handleHint={handleHint} 
                            hints={hints}
                            historyId={historyId}
                        />
                        <ChatInput userInput={userInput} setUserInput={setUserInput} loading={loading} handleSendMessage={handleSendMessage} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Chat;
