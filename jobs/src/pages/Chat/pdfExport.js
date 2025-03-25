export const handleExportPDF = () => {
  const content = document.querySelector(".chat-messages");
  const chatTitle = document.querySelector(".chat-title")?.innerText.trim();

  if (!content) {
    alert("내보낼 콘텐츠를 찾을 수 없습니다.");
    return;
  }

  // 대표질문, 사용자 답변, 꼬리질문만 필터링
  const filteredContent = Array.from(content.children)
    .filter(
      (message) =>
        message.classList.contains("main_question") ||
        message.classList.contains("user_answer") ||
        message.classList.contains("follow-up-message")
    )
    .map((message) => {
      // const text = message.innerText.trim();
      let text = message.innerText
        .split("\n")
        .map((line) => line.trimStart())
        .join("\n")
        .trimEnd();

      let result = "";

      // 메인 질문 (class: main_question)
      if (message.classList.contains("main_question")) {
        result += `
          <p class="question">
            ${text}
          </p>
          <div class="divider"></div>
        `;
      }
      // 사용자 답변 (class: user_answer)
      else if (message.classList.contains("user_answer")) {
        result += `
          <div class="user_answer">
            <div class="answer-wrapper">${text}</div>
          </div>
          <div class="divider"></div>
        `;
      }
      // 꼬리질문 (class: follow-up-message)
      else if (message.classList.contains("follow-up-message")) {
        result += `
          <p class="follow-up-question">
            ${text}
          </p>
          <div class="divider"></div>
        `;
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
            font-size: 16px;
            margin: 0;
          }

          h2 {
            text-align: center;
            margin-bottom: 10px;
          }
            
          /* 대표질문 스타일 */
          .question {
            background: #FFF;
            padding: 16px;
            border: 2px solid #A92419;
            border-radius: 16px;
            font-size: 16px;
            color: #000;
          }

          /* 꼬리질문 스타일 */
          .follow-up-question {
            background: #FFF;
            padding: 16px;
            border: 1.5px solid #084032;
            border-radius: 16px;
            font-size: 16px;
            color: #000;
          }

          /* 사용자 답변 스타일 */
          .user_answer {
            /* 배경, 테두리, 패딩 등 모두 제거 */
            background: none;
            border: none;
            border-radius: 0;
            margin: 0;

            color: black;
            font-size: 16px;
            font-weight: 400;
            line-height: 1.4;

            white-space: pre-wrap;  /* 개행 반영 */
            word-wrap: break-word;
          }
            
          /* 내부 래퍼를 추가하여 모든 줄에 동일한 좌우 여백 적용 */
          .answer-wrapper {
            padding: 0 45px;
          }
        </style>
      </head>
      <body>
        <h2>면접 기록</h2>
        <h3 class="pdf-title">${chatTitle}</h3>
        
        ${filteredContent}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};
