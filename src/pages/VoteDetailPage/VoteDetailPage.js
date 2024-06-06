import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VoteDetailPage.css';
import CopyLink from '../../components/CopyLink/CopyLink';
import NicknameModal from '../../components/NicknameModal/NicknameModal';

const VoteDetailPage = () => {
  const { hash } = useParams();
  const [voteDetail, setVoteDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nickname, setNickname] = useState('');
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const fetchVoteDetail = async () => {
      try {
        const response = await fetch(`http://43.200.168.42/api/vote/${hash}`);
        const data = await response.json();
        if (data.statusCode === 200) {
          setVoteDetail(data.data);
        } else {
          setError('Failed to fetch vote details');
        }
      } catch (err) {
        setError('An error occurred while fetching the vote details');
      } finally {
        setLoading(false);
      }
    };

    fetchVoteDetail();

    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) {
      setNickname(storedNickname);
      setShowModal(false);
    }
  }, [hash]);

  const handleNicknameSubmit = (nickname) => {
    setNickname(nickname);
    localStorage.setItem('nickname', nickname);
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="vote-detail-page">
      <NicknameModal show={showModal} onSubmit={handleNicknameSubmit} />
      <h1>{voteDetail.title}</h1>
      <CopyLink />
      <p>Nickname: {nickname}</p>
      <p>Vote Hash: {voteDetail.voteHash}</p>
      <p>Expires At: {new Date(voteDetail.expireAt).toLocaleString()}</p>
      <p>Allow Duplicate Vote: {voteDetail.allowDuplicateVote ? 'Yes' : 'No'}</p>
      <h2>Vote Options</h2>
      <ul>
        {voteDetail.voteOptionInfoList.map(option => (
          <li key={option.restaurantId}>
            <strong>{option.restaurantName}</strong>
            <p>Voters: {option.voterList.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoteDetailPage;
