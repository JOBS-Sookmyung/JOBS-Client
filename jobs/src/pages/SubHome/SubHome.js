import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import VideoInputModal from "../../component/videoinputModal";
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

  // 로그인한 사용자 정보를 담을 상태
  const [user, setUser] = useState(null);

  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [isRecommendModalOpen, setIsRecommendModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // JSON 데이터 가져오기
  useEffect(() => {
    fetch("/data/youtube_data.json")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching YouTube data:", error));
  }, []);

  // 컴포넌트 마운트 시 localStorage에서 user 데이터 가져오기 -> 사용자별로 정보가 달라질 것임
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openRecommendModal = () => setIsRecommendModalOpen(true);
  const closeRecommendModal = () => setIsRecommendModalOpen(false);

  const handleRecommendationsReceived = (data) => {
    setIsLoading(false);
    setRecommendedVideos(data);
    console.log("✅ 추천 영상 업데이트:", data);
  };

  return (
    <div className="subhome-container">
      <Header />

      <div className="subhome-main">
        {/* 사용자 프로필 영역 */}
        <section className="user-profile">
          <div className="profile-card">
            <img src={profileAvatar} alt="프로필" className="profile-image" />
            <div className="profile-info">
              {/* (수정됨) user 값이 존재하면 그 정보를 표시, 없으면 기본값 */}
              <p>
                <strong>이름: </strong>
                {user ? user.name : "로그인하세요"}
              </p>
              <p>
                <strong>학교: </strong>
                {user ? user.school : "미입력"}
              </p>
              <p>
                <strong>전화번호: </strong>
                {user ? user.phone : "미입력"}
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
              자비스 시작하기
            </button>
            <button className="history-button" onClick={() => navigate("/chat")}>
              지난 기록
            </button>
          </div>
        </section>
      </div>

      {/* 이력서 피드백 안내 */}
      <section className="feedback-section">
        <p className="feedback-text">
          <strong>{user ? user.name : "사용자"}님 이력서 합격 피드백 :</strong>
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
        <div className="recommendation-header">
          <h2>📺 {user ? user.name : "사용자"}님을 위한 추천 영상 ✨</h2>
          <button 
            className="recommend-button"
            onClick={openRecommendModal}
            disabled={isLoading}
          >
            {isLoading ? "추천 중..." : "맞춤 영상 추천받기"}
          </button>
        </div>
        <div className="video-list">
          {isLoading ? (
            <div className="loading-message">영상을 추천하고 있습니다...</div>
          ) : recommendedVideos.length > 0 ? (
            recommendedVideos.map((video, index) => (
              <a
                key={index}
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
            ))
          ) : (
            <div className="no-videos-message">
              이력서를 업로드하여 맞춤 영상을 추천받아보세요!
            </div>
          )}
        </div>
      </section>

      {/* InputModal을 VideoInputModal로 변경 */}
      {isRecommendModalOpen && (
        <VideoInputModal
          closeModal={closeRecommendModal}
          onRecommendationsReceived={handleRecommendationsReceived}
        />
      )}
    </div>
  );
};

export default SubHome;
