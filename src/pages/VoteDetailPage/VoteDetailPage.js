import React from 'react';
import { useParams } from 'react-router-dom';
import './VoteDetailPage.css';

const VoteDetailPage = () => {
  const { hash } = useParams();

  return (
    <div className="vote-detail-page">
      <h1>Vote Detail Page</h1>
      <p>Hash: {hash}</p>
      {/* 나중에 여기에 해시를 기반으로 데이터를 로드하는 로직을 추가할 수 있습니다. */}
    </div>
  );
};

export default VoteDetailPage;
