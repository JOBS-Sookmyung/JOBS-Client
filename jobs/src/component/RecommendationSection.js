import React from 'react';
import VideoInputModal from './videoinputModal';

const RecommendationSection = ({ 
  user, 
  recommendedVideos, 
  isLoading, 
  onRecommendModalOpen,
  onRecommendationsReceived 
}) => {
  return (
    <section className="recommendation-section">
      <div className="recommendation-header">
        <h2>{user ? user.name : "사용자"}님을 위한 추천 영상</h2>
        <button 
          className="recommend-button"
          onClick={onRecommendModalOpen}
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
  );
};

export default RecommendationSection; 