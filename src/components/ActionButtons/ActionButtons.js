import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActionButtons.css';

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleRecommendClick = () => {
    // 모달창을 띄우는 임시 구현
    alert('추천 기능은 아직 구현 중입니다.');
  };

  const handleVoteClick = () => {
    navigate('/vote');
  };

  return (
    <div className='action-button-container'>
      <button className="action-button action-button-recommend" onClick={handleRecommendClick}>
        <div className="action-button-icon"></div>
        <p className='action-button-content'>추&nbsp;&nbsp;&nbsp;천</p>
      </button>
      <button className="action-button action-button-vote" onClick={handleVoteClick}>
        <div className="action-button-icon"></div>
        <p className='action-button-content'>함께 고르기</p>
      </button>
    </div>
  );
}

export default ActionButtons;
