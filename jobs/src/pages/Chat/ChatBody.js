import React from "react";

const ChatBody = ({ messages, hints, loadingHints, handleHint }) => {
  return (
    <div className="chat-body">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.type}`}>
          {message.type === "question" && (
            <button
              className="hint-button"
              onClick={() => handleHint(index)}
              disabled={loadingHints[index]}
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 39,
                  height: 16,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 4,
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    color: "#475569",
                    fontSize: 12,
                    fontFamily: "Plus Jakarta Sans",
                    fontWeight: "500",
                    lineHeight: 16,
                    wordWrap: "break-word",
                  }}
                >
                  힌트
                </div>
                <div data-svg-wrapper style={{ position: "relative" }}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.14439 4.15141L2.94439 8.27641C2.8392 8.37976 2.69763 8.43767 2.55017 8.43767C2.40271 8.43767 2.26114 8.37976 2.15595 8.27641L0.355952 6.50876C0.303228 6.45699 0.261217 6.39534 0.232318 6.32733C0.20342 6.25933 0.188198 6.1863 0.187523 6.11241C0.186161 5.96319 0.244133 5.81953 0.348686 5.71305C0.400456 5.66033 0.462103 5.61832 0.530108 5.58942C0.598114 5.56052 0.671145 5.5453 0.745033 5.54462C0.894256 5.54326 1.03791 5.60123 1.14439 5.70579L2.55064 7.08672L6.35642 3.34891C6.46284 3.24436 6.60643 3.18636 6.75561 3.18768C6.90479 3.189 7.04734 3.24952 7.15189 3.35594C7.25644 3.46236 7.31444 3.60595 7.31312 3.75513C7.3118 3.90431 7.25128 4.04686 7.14486 4.15141H7.14439ZM11.6514 3.35454C11.5996 3.30163 11.5379 3.25947 11.4698 3.23048C11.4017 3.20148 11.3285 3.18622 11.2544 3.18557C11.1804 3.18492 11.107 3.19888 11.0384 3.22667C10.9697 3.25446 10.9073 3.29552 10.8545 3.34751L7.05017 7.08672L6.6808 6.72391C6.57438 6.61936 6.43078 6.56136 6.2816 6.56268C6.13243 6.564 5.98988 6.62453 5.88533 6.73094C5.78077 6.83736 5.72278 6.98095 5.7241 7.13013C5.72541 7.27931 5.78594 7.42186 5.89236 7.52641L6.65595 8.27641C6.76114 8.37976 6.90271 8.43767 7.05017 8.43767C7.19763 8.43767 7.3392 8.37976 7.44439 8.27641L11.6444 4.15141C11.6971 4.09964 11.7391 4.038 11.7679 3.97001C11.7968 3.90201 11.812 3.829 11.8127 3.75513C11.8133 3.68127 11.7994 3.608 11.7717 3.5395C11.7441 3.47101 11.7032 3.40864 11.6514 3.35594V3.35454Z"
                      fill="#475569"
                    />
                  </svg>
                </div>
              </div>
            </button>
          )}
          <p>{message.text}</p>
          {hints[index] && <p className="hint-text">{hints[index]}</p>}
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
