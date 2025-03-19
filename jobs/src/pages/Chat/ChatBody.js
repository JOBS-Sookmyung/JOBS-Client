import React, { useRef, useEffect } from "react";
import { handleExportPDF } from "./pdfExport";
import ChatInput from "./ChatInput";
import "./Chat.css";

const ChatBody = ({ messages = [], loading, userInput, onInputChange, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessage = (message, index) => {
    switch (message.type) {
      case "user_answer":
        return (
          <div key={index} className="message user-message">
            <div className="message-content">{message.text}</div>
          </div>
        );
      case "main_question":
        return (
          <div key={index} className="message bot-message">
            <div className="message-content">{message.text}</div>
          </div>
        );
      case "feedback":
        return (
          <div key={index} className="message feedback-message">
            <div className="message-content">
              <div className="feedback-label">[Feedback]</div>
              <div className="feedback-text">{message.text}</div>
            </div>
          </div>
        );
      case "follow_up":
        return (
          <div key={index} className="message follow-up-message">
            <div className="message-content">{message.text}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="chat-section">
      <div className="chat-header">
        <h2>같이 면접을 준비해요 !</h2>
        <button onClick={handleExportPDF} className="export-button">
          내보내기
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => renderMessage(message, index))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <ChatInput
          userInput={userInput}
          setUserInput={onInputChange}
          loading={loading}
          handleSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatBody;
