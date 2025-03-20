import React, { useRef, useEffect } from "react";

const ChatInput = ({ userInput, setUserInput, loading, handleSendMessage }) => {
  const textAreaRef = useRef(null);

  // 중복 전송 방지를 위한 ref
  const sendingRef = useRef(false);
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
    if (sendingRef.current) return;

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
    // 중복 전송 방지: 이미 전송 중이면 return
    if (sendingRef.current) return;
    sendingRef.current = true;

    // handleSendMessage는 Promise를 반환한다고 가정 (비동기 함수)
    Promise.resolve(handleSendMessage()).finally(() => {
      sendingRef.current = false;
      if (textAreaRef.current) {
        textAreaRef.current.style.height = `${MIN_HEIGHT}px`;
      }
    });
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
        <div data-svg-wrapper>
          <svg
            width="32"
            height="32"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" rx="20" fill="#084032" />
            <path
              d="M25.9853 19.2626L25.9853 19.2626L21.1581 14.4354L21.0781 14.3554V14.4685V28.2498C21.0781 28.5357 20.9645 28.81 20.7623 29.0121C20.5601 29.2143 20.2859 29.3279 20 29.3279C19.714 29.3279 19.4398 29.2143 19.2376 29.0121C19.0354 28.81 18.9218 28.5357 18.9218 28.2498V14.4685V14.3554L18.8418 14.4354L14.0128 19.2626L14.0128 19.2626C13.8102 19.4651 13.5355 19.5789 13.249 19.5789C12.9626 19.5789 12.6878 19.4651 12.4853 19.2626C12.2827 19.06 12.1689 18.7853 12.1689 18.4989C12.1689 18.2124 12.2827 17.9377 12.4853 17.7351L19.2353 10.9851L19.2353 10.9851C19.3355 10.8846 19.4545 10.8048 19.5856 10.7504C19.7166 10.696 19.8571 10.668 19.999 10.668C20.1409 10.668 20.2814 10.696 20.4125 10.7504C20.5435 10.8048 20.6625 10.8846 20.7627 10.9851L20.7628 10.9851L27.5128 17.7351L27.5128 17.7352C27.6133 17.8353 27.6931 17.9544 27.7475 18.0854C27.8019 18.2165 27.8299 18.357 27.8299 18.4989C27.8299 18.6408 27.8019 18.7813 27.7475 18.9123C27.6931 19.0433 27.6133 19.1624 27.5128 19.2625L27.5127 19.2626C27.4125 19.3632 27.2935 19.4429 27.1625 19.4973C27.0314 19.5517 26.8909 19.5797 26.749 19.5797C26.6071 19.5797 26.4666 19.5517 26.3356 19.4973C26.2045 19.4429 26.0855 19.3632 25.9853 19.2626Z"
              fill="white"
              stroke="white"
              strokeWidth="0.09375"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ChatInput;
