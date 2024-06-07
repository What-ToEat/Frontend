import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VoteDetailPage.css';
import CopyLink from '../../components/CopyLink/CopyLink';
import NicknameModal from '../../components/NicknameModal/NicknameModal';
import RestaurantModal from '../../components/RestaurantModal/RestaurantModal'; // Import the modal

const VoteDetailPage = () => {
  const { hash } = useParams();
  const [voteDetail, setVoteDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // State for the selected restaurant

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
  }, [hash]);

  const handleNicknameSubmit = async (nickname, userImage) => {
    try {
      const response = await fetch(`http://43.200.168.42:8080/api/vote/${hash}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: nickname,
          userImage: userImage,
        }),
      });
      const result = await response.json();
      if (result.statusCode === 200) {
        setUserInfo(result.data);
        setShowModal(false);
      } else {
        setError('Failed to submit nickname');
      }
    } catch (err) {
      setError('An error occurred while submitting the nickname');
    }
  };

  const handleRestaurantClick = async (restaurantId) => {
    const response = await fetch(`http://43.200.168.42:8080/api/restaurants/${restaurantId}`);
    const result = await response.json();
    setSelectedRestaurant(result.data);
  };

  const handleCloseModal = () => {
    setSelectedRestaurant(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="vote-detail-page">
      <h1>{voteDetail.title}</h1>
			{userInfo && (
				<div>
					<p>UserInfo: {userInfo.userId}</p>
					<p>UserInfo: {userInfo.nickname}</p>
					<p>UserInfo: {userInfo.profileImage}</p>
				</div>
			)}
      <p>Vote Hash: {voteDetail.voteHash}</p>
      <p>Expires At: {new Date(voteDetail.expireAt).toLocaleString()}</p>
      <p>Allow Duplicate Vote: {voteDetail.allowDuplicateVote ? 'Yes' : 'No'}</p>
      <h2>Vote Options</h2>
      <ul>
        {voteDetail.voteOptionInfoList.map(option => (
					<li key={option.restaurantId} onClick={() => handleRestaurantClick(option.restaurantId)}>
            <strong>{option.restaurantName}</strong>
            <p>Voters: {option.voterList.length}</p>
          </li>
        ))}
      </ul>
			<NicknameModal show={showModal} onSubmit={handleNicknameSubmit} />
      {selectedRestaurant && (
        <RestaurantModal
          show={!!selectedRestaurant}
          handleClose={handleCloseModal}
          restaurant={selectedRestaurant}
					/>
				)}
			<CopyLink />
    </div>
  );
};

export default VoteDetailPage;
