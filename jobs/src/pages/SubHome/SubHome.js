import React from "react";
import { useNavigate } from "react-router-dom";
import "./SubHome.css";

const SubHome = () => {
  const navigate = useNavigate();

  return (
    <div className="subhome-container">
      <header className="subhome-header">
        <h1>JOB!S</h1>
      </header>

      <section className="user-profile">
        <div className="profile-card">
          <div className="profile-image"></div>
          <div className="profile-info">
            <p>
              <strong>이름:</strong> 김숙명
            </p>
            <p>
              <strong>학교:</strong> 숙명여자대학교
            </p>
            <p>
              <strong>어학능력:</strong> TOEIC 900 / OPIc IH
            </p>
          </div>
        </div>
        <div className="start-section">
          <p>이제, 자비스와 함께 모의 면접을 시작하세요.</p>
          <button
            className="start-button"
            onClick={() => alert("모의 면접 준비 중입니다!")}
          >
            모의면접 등록해서 시작하기
          </button>
        </div>
      </section>

      <section className="process-section">
        <h2>자비스 과정 설명</h2>
        <div className="process-steps">
          <div className="step">
            <div className="step-icon">🔍</div>
            <p>자비스가 당신을 분석해요.</p>
          </div>
          <div className="step">
            <div className="step-icon">📄</div>
            <p>이력서 피드백</p>
          </div>
          <div className="step">
            <div className="step-icon">💬</div>
            <p>자비스와 함께 면접을 준비하세요.</p>
          </div>
        </div>
      </section>

      <section className="recommended-videos">
        <h2>📺 김숙명님을 위한 추천 영상 ✨</h2>
        <div className="video-list">
          <div className="video-card">영상 1</div>
          <div className="video-card">영상 2</div>
          <div className="video-card">영상 3</div>
        </div>
      </section>

      <button className="go-back" onClick={() => navigate("/")}>
        🏠 홈으로
      </button>
    </div>
  );
};

export default SubHome;
