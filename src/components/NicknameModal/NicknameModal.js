import React, { useState } from 'react';
import './NicknameModal.css';

const NicknameModal = ({ show, onSubmit }) => {
  const [nickname, setNickname] = useState('');

  if (!show) {
    return null;
  }

  const handleSubmit = () => {
    if (nickname.trim()) {
      onSubmit(nickname);
    }
  };

  return (
    <div className="nickname-modal-backdrop">
      <div className="nickname-modal">
        <h2>닉네임 입력</h2>
        <input 
          type="text" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
          placeholder="닉네임을 입력하세요" 
        />
        <button onClick={handleSubmit}>확인</button>
      </div>
    </div>
  );
};

export default NicknameModal;
