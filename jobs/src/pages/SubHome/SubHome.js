import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import "./SubHome.css";
import anlyzeImg from "../../assets/anlyze.png";
import feedbackImg from "../../assets/feedback.png"
import interviewImg from "../../assets/interview.png" 

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
          <div style={{
            width: "384px",
            height: "240px",
            position: "relative",
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid #E7E8EA",
            backgroundColor: "white"
          }}>

          {/* 번호 */}
          <div style={{
              position: "absolute",
              left: "25px",
              top: "25px",
              fontSize: "13.12px",
              fontWeight: "700",
              fontFamily: "Inter",
              color: "#333436"
          }}>1.</div>

          {/* 제목 */}
          <div style={{
              width: 115.31,
              height: 40,
              left: "25px",
              top: "65px",
              fontSize: "13.12px",
              fontWeight: "700",
              fontFamily: "Inter",
              lineHeight: 20,
              color: "#333436"
          }}>자비스가 당신을 <br /> 분석해요.</div>

          {/* 설명 */}
          <div style={{
              position: "absolute",
              left: "25px",
              top: "119px",
              fontSize: "10px",
              fontWeight: "700",
              fontFamily: "Inter",
              color: "#656A71"
          }}>이력서를 토대로 보다 정확한 <br /> 분석을 진행해요.</div>

          {/* 이미지 */}
          <img 
              src={anlyzeImg} 
              alt="분석 아이콘"
              style={{
                  width: "250px",
                  height: "250px",
                  position: "absolute",
                  left: "194px",
                  top: "1px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)"
              }}
          />
</div>

          <div className="step">
            <img
              src={feedbackImg}
              alt="이력서 피드백 아이콘"
              className="step-icon"
            />
            <p>이력서 피드백</p>
          </div>
          <div className="step">
            <img
              src={interviewImg}
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
