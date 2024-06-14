import React, { forwardRef, useState } from 'react';
import './VoteForm.css';

const VoteForm = forwardRef(({ restaurants, onSubmit }, ref) => {
  const [title, setTitle] = useState('오늘 뭐 먹지?');
  const [expirationTime, setExpirationTime] = useState(1); // 초기 값 1시간
  const [email, setEmail] = useState('');
  const [allowDuplicateVote, setAllowDuplicateVote] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, email, allowDuplicateVote, expirationTime, restaurants });
  };

  return (
    <form className="vote-form-container" ref={ref} onSubmit={handleSubmit}>
      <div className="vote-form-group">
        <label className="vote-form-label">투표 제목</label>
        <input
          className="vote-form-input"
          type="text"
          placeholder='투표 제목을 입력하세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="vote-form-group">
        <label className="vote-form-label">투표 만료 시간</label>
        <select
          className="vote-form-select"
          value={expirationTime}
          onChange={(e) => setExpirationTime(Number(e.target.value))}
          required
        >
          <option value={1}>1시간</option>
          <option value={3}>3시간</option>
          <option value={6}>6시간</option>
          <option value={12}>12시간</option>
          <option value={24}>24시간</option>
        </select>
      </div>
      <div className="vote-form-group">
        <label className="vote-form-label">이메일</label>
        <input
          className="vote-form-input"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="vote-form-group">
        <label className="vote-form-label">
          <input
            className="vote-form-checkbox"
            type="checkbox"
            checked={allowDuplicateVote}
            onChange={(e) => setAllowDuplicateVote(e.target.checked)}
          />
          중복 투표 허용
        </label>
      </div>
    </form>
  );
});

export default VoteForm;
