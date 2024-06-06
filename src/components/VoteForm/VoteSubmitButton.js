import React from 'react';
import './VoteSubmitButton.css';

const VoteSubmitButton = ({ onClick, disabled }) => {
  return (
    <button
      className="vote-submit-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <p>투표 시작하기</p>
    </button>
  );
};

export default VoteSubmitButton;
