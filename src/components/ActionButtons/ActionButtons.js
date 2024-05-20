import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <button onClick={handleRecommendClick}>추천</button>
      <button onClick={handleVoteClick}>함께 고르기</button>
    </div>
  );
}

export default ActionButtons;
