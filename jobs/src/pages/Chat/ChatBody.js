import React, { useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import { handleExportPDF } from "./pdfExport";

const ChatBody = ({
  messages = [],
  loading,
  userInput,
  onInputChange,
  onSendMessage,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessage = (message, index) => {
    switch (message.type) {
      case "main_question":
        return (
          <div key={index} className="message question">
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
          <div key={index} className="message ai-response">
            <div className="message-content">
              <div className="feedback-label">[Feedback]</div>
              <div className="feedback-text">{message.text}</div>
            </div>
          </div>
        );
      case "follow_up":
        return (
          <div key={index} className="message ai-response">
            <div className="message-content">꼬리질문: {message.text}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="chat-body">
      <div className="chat-messages">
        {messages
          .sort((a, b) => {
            if (a.type === "user_answer" && b.type === "feedback") return -1;
            if (a.type === "feedback" && b.type === "user_answer") return 1;
            return 0;
          })
          .map((message, index) => renderMessage(message, index))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatBody;
