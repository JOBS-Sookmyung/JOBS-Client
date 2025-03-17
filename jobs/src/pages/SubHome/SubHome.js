import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import VideoInputModal from "../../component/videoinputModal";
import InputModal from "../../component/InputModal";
import RecommendationSection from "../../component/RecommendationSection";
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
  const [user, setUser] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [isRecommendModalOpen, setIsRecommendModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFeedback, setResumeFeedback] = useState("");

  // JSON 데이터 가져오기
  useEffect(() => {
    fetch("/data/youtube_data.json")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching YouTube data:", error));
  }, []);

  // 컴포넌트 마운트 시 localStorage에서 user 데이터 가져오기
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
    
    // 이력서 피드백 설정
    const feedbacks = [
      "구체적인 수치와 성과를 언급하여 신뢰성을 주는 방향으로 더 자세히 기술하면 좋겠습니다.",
      "직무와 연관된 경험을 구제적으로 예시를 들어 더 강조해보세요.",
      "프로젝트 성과를 구체적으로 어떤 목표를 이루어냈는지에 대해 자세히 기술하면 좋겠습니다.",
      "핵심 역량을 더 명확하게 표현해보세요.",
      "모든 경험이 면접에 도움이 될 수 있으니 더  자세히 기술해보세요.",
      "기술 스택 부분이 부실해보입니다. 학교 수업에서 배운 내용도 기술해보세요",
      "회사에서 요구하는 스킬 위주로 정리해서 작성하는 것이 더 좋아보입니다.",
      "구체적인 프로젝트 목표와 결과를 명확히 제시해보세요.",
      "단순한 역할 설명이 아닌, 본인의 기여도를 부각해보세요.",
      "업무와 관련된 도전 과제와 해결 과정을 상세히 적어보세요.",
      "기술 스택을 좀 더 구체적으로 나열하면 경쟁력이 높아집니다.",
      "팀 프로젝트에서의 협업 경험을 강조하면 더욱 효과적입니다.",
      "성과를 강조할 때 단순히 '기여했다'보다는 '어떤 방식으로' 기여했는지 설명해보세요.",
      "자신의 강점을 더욱 돋보이게 하도록 차별화된 경험을 추가해보세요.",
      "기술을 활용한 문제 해결 사례를 포함하면 더욱 강한 인상을 줄 수 있습니다.",
      "면접관이 궁금해할 만한 요소를 미리 고려하여 서술하면 좋습니다.",
      "구체적인 업무 프로세스를 설명하여 직무 이해도를 높여보세요.",
      "본인의 역할과 기여도를 명확히 나타낼 수 있도록 사례를 덧붙여보세요.",
      "핵심 역량을 강조하여 강점을 더욱 부각해보세요.",
      "모든 경험이 도움이 될 수 있으니 놓치지 말고 자세히 작성해보세요.",
      "단순한 나열이 아닌, 성과 중심의 서술 방식으로 변경해보세요.",
      "지원하는 직무와 연결될 수 있도록 경험을 재구성하면 좋습니다.",
      "학교에서 배운 내용도 포함하면 기술적 역량을 더욱 잘 보여줄 수 있습니다."
    ];
    
    const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
    setResumeFeedback(randomFeedback);
    
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
      {resumeFeedback && (
        <section className="feedback-section">
          <p className="feedback-text">
            <strong>{user ? user.name : "사용자"}님 이력서 합격 피드백 : </strong>
            {resumeFeedback}
          </p>
        </section>
      )}

      {/* 자비스 과정 설명 */}
      <section className="process-section">
        <h2>Jobis Guide</h2>
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
                <p className="process-title">자비스의 <br /> 맞춤 동영상 추천.</p>
                <p className="process-description">
                  당신에게 가장 필요한 <br /> 최적의 동영상을 추천해요.
                </p>
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
                <p className="process-description">
                  당신을 위한 <br /> 실전같은 면접을 대비해요.
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
      <RecommendationSection
        user={user}
        recommendedVideos={recommendedVideos}
        isLoading={isLoading}
        onRecommendModalOpen={openRecommendModal}
        onRecommendationsReceived={handleRecommendationsReceived}
      />

      {/* InputModal */}
      {isModalOpen && (
        <InputModal
          closeModal={closeModal}
          onRecommendationsReceived={handleRecommendationsReceived}
        />
      )}

      {/* VideoInputModal */}
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
