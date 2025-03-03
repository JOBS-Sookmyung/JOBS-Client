import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import "./SubHome.css";

const SubHome = () => {
  const navigate = useNavigate();

  return (
    <div className="subhome-container">
      <Header />

      <div className="subhome-main">
        {/* 왼쪽: 사용자 프로필 영역 */}
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
        </section>

        {/* 오른쪽: 설명 및 버튼 */}
        <section className="description-section">
          <p className="description-text">
            이제, 자비스와 함께 모의 면접을 시작하세요.
          </p>
          <div className="button-group">
            <button className="start-button" onClick={() => navigate("/input")}>
              모의면접 시작하기
            </button>
            <button
              className="history-button"
              onClick={() => navigate("/chat")}
            >
              지난 기록
            </button>
          </div>
        </section>
      </div>

      {/* 이력서 피드백 안내 */}
      <section className="feedback-section">
        <p className="feedback-text">
          <strong>김숙명님 이력서 합격 피드백 :</strong> 이력서의 경험과 역량을
          더욱 명확하게 드러내기 위해 구체적인 수치와 직무 관련 키워드를
          활용하면 좋겠습니다.
        </p>
      </section>

      {/* 자비스 과정 설명 */}
      <section className="process-section">
        <h2>자비스 과정 설명</h2>
        <div className="process-steps">
          <div className="step">
            <img
              src="/assets/analyze.png"
              alt="분석 아이콘"
              className="step-icon"
            />
            <p>자비스가 당신을 분석해요.</p>
          </div>
          <div className="step">
            <img
              src="/assets/feedback.png"
              alt="이력서 피드백 아이콘"
              className="step-icon"
            />
            <p>이력서 피드백</p>
          </div>
          <div className="step">
            <img
              src="/assets/interview.png"
              alt="면접 준비 아이콘"
              className="step-icon"
            />
            <p>자비스와 함께 면접을 준비하세요.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubHome;
