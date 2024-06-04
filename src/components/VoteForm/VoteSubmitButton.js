import React from 'react';
import './VoteSubmitButton.css';

const VoteSubmitButton = ({ onClick }) => {
  return (
    <button className="vote-submit-button" type="button" onClick={onClick}>
      <p>투표 시작하기</p>
    </button>
  );
};

export default VoteSubmitButton;
