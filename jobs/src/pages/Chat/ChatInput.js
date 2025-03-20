import React, { useRef, useEffect } from "react";

const ChatInput = ({ userInput, setUserInput, loading, handleSendMessage }) => {
  const textAreaRef = useRef(null);

  // 원하는 최소/최대 높이
  const MIN_HEIGHT = 24;
  const MAX_HEIGHT = 100;

  // ★ 최초 마운트 시점에 textarea 높이를 강제로 MIN_HEIGHT로 설정
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = `${MIN_HEIGHT}px`;
    }
  }, []);

  // 입력 변화 시 자동 리사이즈
  const handleInputChange = (e) => {
    setUserInput(e.target.value);

    if (textAreaRef.current) {
      // 1) 먼저 최소 높이로 리셋
      textAreaRef.current.style.height = `${MIN_HEIGHT}px`;

      // 2) 입력이 비어 있으면 최소 높이 유지
      if (e.target.value.trim() === "") {
        textAreaRef.current.style.height = `${MIN_HEIGHT}px`;
      } else {
        // 3) 내용이 있으면 scrollHeight와 MAX_HEIGHT를 비교해서 설정
        textAreaRef.current.style.height = "auto";
        const newHeight = Math.min(
          textAreaRef.current.scrollHeight,
          MAX_HEIGHT
        );
        textAreaRef.current.style.height = `${newHeight}px`;
      }
    }
  };

  // 엔터로 전송 시
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessageWrapper();
    }
  };

  // 전송 후 textarea 높이를 다시 최소로 복구
  const handleSendMessageWrapper = () => {
    handleSendMessage();
    if (textAreaRef.current) {
      textAreaRef.current.style.height = `${MIN_HEIGHT}px`;
    }
  };

  return (
    <div className="chat-input">
      <textarea
        ref={textAreaRef}
        className="input-field"
        placeholder="🧠  당황하지 말고, 침착하게 답해주세요."
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <button
        className="send-button"
        onClick={handleSendMessageWrapper}
        disabled={loading}
        style={{ opacity: loading ? 0.5 : 1 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
