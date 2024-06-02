import React, { useState } from 'react';

const VoteForm = ({ restaurants }) => {
  const [title, setTitle] = useState('');
  const [expirationTime, setExpirationTime] = useState(1); // 초기 값 1시간
  const [email, setEmail] = useState('');
  const [allowDuplicateVote, setAllowDuplicateVote] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://43.200.168.42/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        email,
        allowDuplicateVote,
        expirationTime,
        restaurants: restaurants.map(r => r.restaurantId), // 실제 레스토랑 ID 리스트로 교체해야 합니다.
      }),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.ok) {
      alert('투표가 생성되었습니다!');
    } else {
      alert('투표 생성에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>투표 제목</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>투표 만료 시간</label>
        <select value={expirationTime} onChange={(e) => setExpirationTime(Number(e.target.value))} required>
          <option value={1}>1시간</option>
          <option value={3}>3시간</option>
          <option value={6}>6시간</option>
          <option value={12}>12시간</option>
          <option value={24}>24시간</option>
        </select>
      </div>
      <div>
        <label>이메일</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>중복 투표</label>
        <input type="checkbox" checked={allowDuplicateVote} onChange={(e) => setAllowDuplicateVote(e.target.checked)} />
      </div>
      <button type="submit">투표 시작하기</button>
    </form>
  );
};

export default VoteForm;
