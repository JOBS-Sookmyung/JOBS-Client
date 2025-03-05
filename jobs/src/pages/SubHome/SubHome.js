import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import InputModal from "../../component/InputModal";
import "./SubHome.css";
import analyseImg from "../../assets/analyse.png";
import feedbackImg from "../../assets/feedback.png";
import interviewImg from "../../assets/interview.png";
import profileAvatar from "../../assets/profileAvatar.png";
import interviewIcon from "../../assets/interviewIcon.png";

const SubHome = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // JSON 데이터 가져오기
  useEffect(() => {
    fetch("/data/youtube_data.json")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching YouTube data:", error));
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="subhome-container">
      <Header />

      <div className="subhome-main">
        {/* 사용자 프로필 영역 */}
        <section className="user-profile">
          <div className="profile-card">
            <img src={profileAvatar} alt="프로필" className="profile-image" />
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

        {/* 설명 및 버튼 */}
        <section className="description-section">
          <img
            src={interviewIcon}
            alt="인터뷰 아이콘"
            className="interview-icon"
          />
          <p className="description-text">
            이제, 자비스와 함께 모의 면접을 시작하세요.
          </p>
          <div className="button-group">
            <button className="start-button" onClick={openModal}>
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
          <strong>김숙명님 이력서 합격 피드백 :</strong>
          이력서의 경험과 역량을 더욱 명확하게 드러내기 위해 구체적인 수치와
          직무 관련 키워드를 활용하면 좋겠습니다.
        </p>
      </section>

      {/* 자비스 과정 설명 */}
      <section className="process-section">
        <h2>자비스 과정 설명</h2>
        <div className="process-steps">
          <div className="process-card process-card-1">
            <div className="process-card-content">
              <div className="process-text">
                <span className="process-number">1.</span>
                <p className="process-title">
                  자비스가 당신을 <br /> 분석해요.
                </p>
                <p className="process-description">
                  이력서를 토대로 보다 정확한 <br /> 분석을 진행해요.
                </p>
              </div>
              <img
                src={analyseImg}
                alt="분석 아이콘"
                className="process-icon"
              />
            </div>
          </div>

          <div className="process-card process-card-2">
            <div className="process-card-content">
              <div className="process-text">
                <span className="process-number">2.</span>
                <p className="process-title">이력서 피드백</p>
              </div>
              <img
                src={feedbackImg}
                alt="이력서 피드백 아이콘"
                className="process-icon"
              />
            </div>
          </div>

          <div className="process-card process-card-3">
            <div className="process-card-content">
              <div className="process-text">
                <span className="process-number">3.</span>
                <p className="process-title">
                  자비스와 함께 <br /> 진짜 면접을 준비해요.
                </p>
              </div>
              <img
                src={interviewImg}
                alt="면접 준비 아이콘"
                className="process-icon"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 추천 영상 섹션 */}
      <section className="recommendation-section">
        <h2>📺 김숙명님을 위한 추천 영상 ✨</h2>
        <div className="video-list">
          {videos.slice(0, 6).map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="video-item"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="video-thumbnail"
              />
              <p className="video-title">{video.title}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 모달 컴포넌트 */}
      {isModalOpen && <InputModal closeModal={closeModal} />}
    </div>
  );
};

export default SubHome;
