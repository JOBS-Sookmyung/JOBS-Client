import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Chat = () => {
  const handleExportToPDF = async () => {
    const element = document.getElementById("content"); // PDF로 추출할 영역의 ID
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("export.pdf"); // 저장될 파일명
  };

  return (
    <div>
      {/* PDF로 변환할 영역 */}
      <div id="content">
        <h2>예상질문 1</h2>
        <p>프로젝트에서 협업 경험이 있다면...</p>
        <p>최근 졸업 프로젝트에서...</p>

        <h2>프로젝트 중 팀원 간 의견 충돌이 있었다면...</h2>
        <p>디자인 단계에서 UI 요소를...</p>
      </div>

      {/* 내보내기 버튼 */}
      <button onClick={handleExportToPDF}>내보내기</button>
    </div>
  );
};

export default Chat;
