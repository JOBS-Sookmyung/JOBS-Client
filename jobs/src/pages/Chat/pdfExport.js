export const handleExportPDF = () => {
  const content = document.querySelector(".chat-body");
  const chatTitle = document.querySelector(".chat-title")?.innerText.trim();

  if (!content) {
    alert("내보낼 콘텐츠를 찾을 수 없습니다.");
    return;
  }

  // 대표질문을 chat-title에서 가져오기
  const filteredContent = Array.from(content.children)
    .filter(
      (message) =>
        !message.classList.contains("hint-text") && // 힌트 제거
        !message.classList.contains("hint-button") // 힌트 버튼 제거
    )
    .map((message) => {
      const text = message.innerText.trim();
      let result = "";

      // 대표질문: 기존 question은 출력 안 함
      if (message.classList.contains("question")) {
        return "";
      }

      // 사용자 답변 (B2 크기) + 구분선 추가
      if (message.classList.contains("user")) {
        result += `<p class="user">${text}</p>`;
        result += `<div class="divider"></div>`;
      }

      // 꼬리질문 (H5 크기)
      if (
        message.classList.contains("ai-response") &&
        text.startsWith("꼬리질문:")
      ) {
        result += `<h5 class="follow-up-question">${text.replace(
          "꼬리질문:",
          ""
        )}</h5>`;
      }

      // 일반 AI 응답 (기본 스타일)
      if (message.classList.contains("ai-response")) {
        result += `<p class="ai-response">${text}</p>`;
      }

      return result;
    })
    .join("");

  const printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(`
        <html>
          <head>
            <title>면접 기록</title>
            <style>
              @import url('https://cdn.jsdelivr.net/npm/pretendard/dist/web/static/pretendard.css');
              
              body { 
                padding: 20px; 
                font-family: 'Pretendard', sans-serif;
                text-align: left;
              }
              h2 { text-align: center; }
              .message { 
                margin-bottom: 15px; 
                padding: 10px; 
                border-radius: 5px; 
              }
              .question { 
                font-size: 18px;
                font-weight: bold;
                color: #1E293B;
              }
              .follow-up-question { 
                font-size: 16px;
                font-weight: bold;
                color: #374151;
              }
              .user { 
                font-size: 14px;
                font-weight: 500;
                color: #084032;
                margin-bottom: 20px;
              }
              .ai-response { 
                background: #d1fae5; 
                padding: 10px; 
                color: var(--Gray-80, #1E293B); 
                font-family: "Pretendard", sans-serif;
                font-size: 14px; 
                font-style: normal;
              }
              .divider {
                width: 80%;
                height: 1px;
                background-color: #E5E7EB;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <h2>면접 기록</h2>
            <h4 class="question">${chatTitle}</h4>
            ${filteredContent}
          </body>
        </html>
      `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};
