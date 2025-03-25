import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 import
import ChatHeader from "../../component/ChatHeader";
import "./Chat.css";

const ChatSidebar = ({ selectedSessionToken, handleSelectSession, shouldRefresh, onRefreshComplete }) => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate(); // useNavigate 훅을 호출해서 navigate 함수 얻기

    const fetchSessions = async () => {
        try {
            console.log("Fetching sessions...");
            setLoading(true);
            const response = await fetch("http://localhost:8000/chat/all/sessions");
            if (!response.ok) {
                throw new Error("세션 목록을 가져오는데 실패했습니다.");
            }
            const data = await response.json();
            console.log("Received sessions data:", data);
            
            // 서버에서 배열 대신 단일 객체를 반환하는 경우 처리
            if (!Array.isArray(data)) {
                if (data.session_token && data.session_token === 'sessions') {
                    console.log("Server returned a single session object instead of an array");
                    setSessions([]);
                    return;
                } else if (data.length === undefined) {
                    // 단일 세션 객체를 배열로 변환
                    const sessionArr = [data];
                    console.log("Converting single session to array:", sessionArr);
                    
                    // 세션 데이터 추가 처리
                    const updatedSessions = await Promise.all(
                        sessionArr.map(async (session) => {
                            try {
                                if (session.session_token) {
                                    const chatResponse = await fetch(`http://localhost:8000/chat/${session.session_token}`);
                                    if (chatResponse.ok) {
                                        const chatData = await chatResponse.json();
                                        console.log(`Chat data for session ${session.session_token}:`, chatData);
                                        return {
                                            ...session,
                                            currentQuestion: chatData.messages.filter(msg => msg.type === "main_question").length,
                                            lastMessage: session.last_message || "새로운 면접을 시작해보세요"
                                        };
                                    }
                                }
                            } catch (error) {
                                console.error(`Error fetching chat data for session ${session.session_token}:`, error);
                            }
                            return session;
                        })
                    );
                    
                    console.log("Updated sessions:", updatedSessions);
                    setSessions(updatedSessions.filter(Boolean));
                    return;
                }
            }

            // 배열인 경우 (정상 응답)
            const updatedSessions = await Promise.all(
                data.map(async (session) => {
                    try {
                        const chatResponse = await fetch(`http://localhost:8000/chat/${session.session_token}`);
                        if (chatResponse.ok) {
                            const chatData = await chatResponse.json();
                            console.log(`Chat data for session ${session.session_token}:`, chatData);
                            return {
                                ...session,
                                currentQuestion: chatData.messages.filter(msg => msg.type === "main_question").length,
                                lastMessage: session.last_message || "새로운 면접을 시작해보세요"
                            };
                        }
                    } catch (error) {
                        console.error(`Error fetching chat data for session ${session.session_token}:`, error);
                    }
                    return session;
                })
            );
            
            console.log("Updated sessions:", updatedSessions);
            setSessions(updatedSessions.filter(Boolean));
            
            if (shouldRefresh && onRefreshComplete) {
                console.log("Completing refresh...");
                onRefreshComplete();
            }
        } catch (error) {
            console.error("Error fetching sessions:", error);
            setError(error.message);
            setSessions([]);
        } finally {
            setLoading(false);
        }
    };

    // selectedSessionToken이나 shouldRefresh가 변경될 때마다 세션 목록 업데이트
    useEffect(() => {
        console.log("Effect triggered. shouldRefresh:", shouldRefresh);  // 디버깅 로그
        fetchSessions();
    }, [selectedSessionToken, shouldRefresh]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const koreanTime = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // UTC+9 (한국 시간)
        
        return koreanTime.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(/\./g, '-').replace('- ', ' '); // 구분자를 '-'로 변경하고 마지막 점 제거
    };

    const getSessionTitle = (session) => {
        const questionNumber = session.currentQuestion || 0;
        return `면접 세션 ${questionNumber}/5`;
    };

    const getLastMessagePreview = (session) => {
        return session.lastMessage || "새로운 면접을 시작해보세요";
    };

    const handleSessionSelect = (sessionToken) => {
        handleSelectSession(sessionToken); // 기존 handler 호출
        // URL을 ?session_token={sessionToken} 형식으로 변경
        navigate(`/chat?session_token=${sessionToken}`); // 쿼리 파라미터 방식으로 URL 변경
    };

    if (loading && sessions.length === 0) {
        return (
            <div className="sidebar">
                <ChatHeader />
                <div className="section">
                    <div className="section-header">
                        <h5 className="section-title">채팅방</h5>
                    </div>
                    <div className="loading">로딩 중...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="sidebar">
            <ChatHeader />
            <div className="section">
                <div className="section-header">
                    <h5 className="section-title">채팅방</h5>
                </div>
                <ul className="chat-room-list">
                    {sessions && sessions.length > 0 ? (
                        sessions.map((session) => (
                            <li
                                key={session.session_token}
                                className={`chat-room-item ${
                                    selectedSessionToken === session.session_token ? "active" : ""
                                } ${session.status === "completed" ? "completed" : ""}`}
                                onClick={() => handleSessionSelect(session.session_token)} // 클릭 시 URL 변경
                            >
                                <div className="chat-room-info">
                                    <div className="chat-room-name">
                                        {getSessionTitle(session)}
                                    </div>
                                    <div className="chat-room-time">
                                        {formatDate(session.created_at)}
                                    </div>
                                </div>
                                <div className="chat-room-preview">
                                    {getLastMessagePreview(session)}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="chat-room-item empty">
                            <div className="chat-room-preview">
                                면접 세션이 없습니다. 새로운 면접을 시작해보세요!
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ChatSidebar;
