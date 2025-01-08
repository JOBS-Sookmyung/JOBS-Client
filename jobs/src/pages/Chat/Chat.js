import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Chat = () => {
  const location = useLocation();
  const question = location.state?.question || "질문을 선택하세요."; // 기본 질문 설정
  const [showQuestions, setShowQuestions] = useState(true);
  const [showHistory, setShowHistory] = useState(true);

  return (
    <div className="d-flex vh-100">
      {/* 왼쪽 사이드바 */}
      <div className="col-3 border-end bg-light">
        {/* 대표 질문 영역 */}
        <div className="p-3 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">대표 질문들</h5>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setShowQuestions(!showQuestions)}
            >
              {showQuestions ? "숨기기" : "보기"}
            </button>
          </div>
          {showQuestions && (
            <ul className="list-unstyled mt-3">
              <li className="p-2 rounded hover-bg-light">프로젝트 협업 경험</li>
              <li className="p-2 rounded hover-bg-light">본인의 강점과 약점</li>
              <li className="p-2 rounded hover-bg-light">입사 후 5년 뒤</li>
              <li className="p-2 rounded hover-bg-light">갈등 상황 해결</li>
              <li className="p-2 rounded hover-bg-light">
                본인이 생각하는 곳 장점이란?
              </li>
            </ul>
          )}
        </div>

        {/* 이전 기록 영역 */}
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">이전 기록들</h5>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? "숨기기" : "보기"}
            </button>
          </div>
          {showHistory && (
            <ul className="list-unstyled mt-3">
              <li className="p-2 rounded hover-bg-light">
                현대 모비스 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                네이버 클라우드 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                넥슨 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                구글 코리아 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                애플 코리아 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                마이크로소프트 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                하나은행 모의 면접 기록
              </li>
              <li className="p-2 rounded hover-bg-light">
                실리콘밸리 모의 면접 기록
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* 오른쪽 채팅 영역 */}
      <div className="col-9 d-flex flex-column">
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{question}</h5>
          <button className="btn btn-success">내보내기</button>
        </div>
        <div className="flex-grow-1 p-3 bg-white overflow-auto">
          <div className="mb-3">
            <p className="text-muted small">JOB</p>
            <p className="bg-light p-3 rounded">
              프로젝트에서 어떤 역할을 맡았고...
            </p>
          </div>
          <div className="mb-3">
            <p className="text-muted small">JOB</p>
            <p className="bg-light p-3 rounded">우선 팀원들과...</p>
          </div>
          <div className="mb-3 text-end">
            <p className="bg-success text-white p-3 rounded d-inline-block">
              좋습니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
