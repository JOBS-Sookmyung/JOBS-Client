import React from "react";
import ChatHeader from "../../component/ChatHeader";

const ChatSidebar = ({
  questions = [],
  selectedQuestionIndex,
  handleSelectMainQuestion,
  showQuestions,
  setShowQuestions,
  sessionToken,
}) => {
  // 현재 시간을 "오후 2:30" 형식으로 변환
  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="sidebar">
      <ChatHeader />
      
      {/* 채팅방 정보 */}
      <div className="section">
        <div className="section-header">
          <h5 className="section-title">채팅방</h5>
        </div>
        {sessionToken && (
          <ul className="chat-room-list">
            <li className="chat-room-item active">
              <div className="chat-room-info">
                <div className="chat-room-name">면접 준비</div>
                <div className="chat-room-time">{formatTime()}</div>
              </div>
              <div className="chat-room-preview">
                {questions[selectedQuestionIndex] || "새로운 면접을 시작해보세요"}
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
