import React, { useState, useRef, useEffect } from 'react';
import './Chat.css'; // CSS 파일을 chat.css로 변경

const ChatBody = ({ messages, handleHint, hints, historyId }) => {
  const messagesEndRef = useRef(null);
  const [loadingHints, setLoadingHints] = useState({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleHintClick = async (index) => {
    setLoadingHints(prev => ({ ...prev, [index]: true }));
    await handleHint(index, false);
    setLoadingHints(prev => ({ ...prev, [index]: false }));
  };

  const renderMessage = (message, index) => {
    switch (message.type) {
      case "user":
        return (
          <div key={index} className="message user-message">
            <div className="message-content">{message.text}</div>
          </div>
        );
      case "feedback":
        return (
          <div key={index} className="message feedback-message">
            <div className="message-content">
              <h4>📝 피드백</h4>
              <p>{message.text}</p>
            </div>
          </div>
        );
      case "follow-up":
        return (
          <div key={index} className="message follow-up-message">
            <div className="message-content">
              <h4>💭 꼬리질문</h4>
              <p>{message.text}</p>
            </div>
          </div>
        );
      case "bot":
        return (
          <div key={index} className="message bot-message">
            <div className="message-content">
              <p>{message.text}</p>
              <button 
                className="hint-button"
                onClick={() => handleHintClick(index)}
                disabled={loadingHints[index]}
              >
                {loadingHints[index] ? '로딩 중...' : '힌트 요청'}
              </button>
            </div>
            {hints[`${historyId}-${index}`] && (
              <div className="hint">
                <p>{hints[`${historyId}-${index}`]}</p>
              </div>
            )}
          </div>
        );
      case "error":
        return (
          <div key={index} className="message error-message">
            <div className="message-content">{message.text}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="chat-body">
      {messages.map((message, index) => renderMessage(message, index))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBody;

