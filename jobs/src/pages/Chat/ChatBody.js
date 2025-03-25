import React, { useRef, useEffect, useState } from "react";


const ChatBody = ({ messages = [] }) => {
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // 컴포넌트 마운트 시 localStorage에서 user 데이터 가져오기
  
  const renderMessage = (message, index) => {
    switch (message.type) {
      case "main_question":
        return (
          <div key={index} className="message main_question">
            <div className="message-content">{message.text}</div>
          </div>
        );
      case "user_answer":
        return (
          <div key={index} className="message user_answer">
            <div className="message-content">{message.text}</div>
          </div>
        );
      case "feedback":
        return (
          <div key={index} className="message feedback-message">
            <div className="message-content">
              <div className="feedback-label">[Feedback]</div>
              <div className="feedback-message">{message.text}</div>
            </div>
          </div>
        );
      case "follow_up":
        return (
          <div key={index} className="message follow-up-message">
            <div className="message-content">
              꼬리질문: <br />
              {message.text}
            </div>
          </div>
        );
      case "system": // 시스템 메시지 처리
        return (
          <div key={index} className="message system-message">
            <div className="message-content">
              <span className="system-label">[System]</span>
              <span>{message.text}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="chat-body">
      <div className="chat-messages">
        {messages.map((message, index) => renderMessage(message, index))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatBody;
