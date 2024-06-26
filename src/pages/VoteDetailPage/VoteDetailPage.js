import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VoteDetailPage.css';
import CopyLink from '../../components/CopyLink/CopyLink';
import NicknameModal from '../../components/NicknameModal/NicknameModal';
import RestaurantModal from '../../components/RestaurantModal/RestaurantModal';
import VoteRestaurantCard from '../../components/VoteRestaurantCard/VoteRestaurantCard';
import VoteHeader from '../../components/VoteHeader/VoteHeader';

const VoteDetailPage = () => {
  const { hash } = useParams();
  const [voteDetail, setVoteDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [initialSelection, setInitialSelection] = useState([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const fetchVoteDetail = async () => {
      try {
        const response = await fetch(`http://43.200.168.42/api/vote/${hash}`);
        const data = await response.json();
        if (data.statusCode === 200) {
          setVoteDetail(data.data);
          setInitialSelection(data.data.voteOptionInfoList.filter(option => option.isSelected).map(option => option.restaurantId));
          const currentTime = new Date();
          const expirationTime = new Date(new Date(data.data.expireAt).getTime() + 9 * 60 * 60 * 1000); // Add 9 hours
          if (currentTime > expirationTime) {
            setIsExpired(true);
          }
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
    if (isExpired) return;
    
    setSelectedRestaurants(prevState => {
      let newSelection;
      if (voteDetail.allowDuplicateVote) {
        newSelection = prevState.includes(restaurantId)
          ? prevState.filter(id => id !== restaurantId)
          : [...prevState, restaurantId];
      } else {
        newSelection = prevState.includes(restaurantId) ? [] : [restaurantId];
      }

      setIsSubmitEnabled(JSON.stringify(newSelection) !== JSON.stringify(initialSelection));

      return newSelection;
    });
  };

  const handleViewDetails = async (restaurant) => {
    const response = await fetch(`http://43.200.168.42:8080/api/restaurants/${restaurant.restaurantId}`);
    const result = await response.json();
    setSelectedRestaurant(result.data);
  };

  const handleCloseModal = () => {
    setSelectedRestaurant(null);
  };

  const handleSubmitVote = async () => {
    try {
      const response = await fetch(`http://43.200.168.42:8080/api/vote/${hash}/selection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userInfo.userId,
          nickname: userInfo.nickname,
          options: selectedRestaurants,
        }),
      });
      const result = await response.json();
      if (result.statusCode === 201) {
        alert('투표가 완료되었습니다.');
        await fetchVoteDetail(); // Fetch the updated vote details
      } else {
        alert(result.message);
        await fetchVoteDetail();
      }
    } catch (err) {
      setError('An error occurred while submitting the vote');
    }
  };

  const handleResetVote = async () => {
    try {
      const response = await fetch(`http://43.200.168.42:8080/api/vote/${hash}/selection`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userInfo.userId,
          nickname: userInfo.nickname,
        }),
      });
      const result = await response.json();
      if (result.statusCode === 200) {
        alert('투표 내용이 초기화되었습니다.');
        await fetchVoteDetail();
      } else {
        alert(result.message);
        await fetchVoteDetail();
      }
    } catch (err) {
      setError('An error occurred while resetting the vote');
    }
  };

  const fetchVoteDetail = async () => {
    try {
      const response = await fetch(`http://43.200.168.42/api/vote/${hash}`);
      const data = await response.json();
      if (data.statusCode === 200) {
        setVoteDetail(data.data);
        setInitialSelection(data.data.voteOptionInfoList.filter(option => option.isSelected).map(option => option.restaurantId));
        setSelectedRestaurants([]);
        setIsSubmitEnabled(false);
        const currentTime = new Date();
        const expirationTime = new Date(new Date(data.data.expireAt).getTime() + 9 * 60 * 60 * 1000); // Add 9 hours
        if (currentTime > expirationTime) {
          setIsExpired(true);
        } else {
          setIsExpired(false);
        }
      } else {
        setError('Failed to fetch vote details');
      }
    } catch (err) {
      setError('An error occurred while fetching the vote details');
    } finally {
      setLoading(false);
    }
  };

  const formatExpireAt = (expireAt) => {
    const date = new Date(new Date(expireAt).getTime() + 9 * 60 * 60 * 1000); // Add 9 hours
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}시 ${formattedMinutes}분`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="vote-detail-page">
      <div className="vote-page-header">
        <VoteHeader content="투표 작성" />
      </div>
      <div className='vote-detail-page-body'>
        <div className='vote-detail-page-body-container'>
          <p className='vote-detail-page-title'>{voteDetail.title}</p>
          <p className='vote-detail-page-content'>{formatExpireAt(voteDetail.expireAt)} 마감</p>
          <p className='vote-detail-page-content'>중복 투표 {voteDetail.allowDuplicateVote ? '가능' : '불가능'}</p>
          <div>{userInfo && (
            <p className='vote-detail-page-content'>닉네임: {userInfo.nickname}</p>
          )}
          </div>
          <div className='vote-detail-page-divider'>
          </div>
          <div>
            {voteDetail.voteOptionInfoList.map(option => (
              <VoteRestaurantCard
                key={option.restaurantId}
                option={option}
                onClick={handleRestaurantClick}
                isSelected={selectedRestaurants.includes(option.restaurantId)}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          {!isExpired && <NicknameModal show={showModal} onSubmit={handleNicknameSubmit} />}
          {selectedRestaurant && (
            <RestaurantModal
              show={!!selectedRestaurant}
              handleClose={handleCloseModal}
              restaurant={selectedRestaurant}
            />
          )}
        </div>
        <div className='vote-detail-page-button-container'>
          {!isExpired && (
            <>
              <button className='vote-detail-page-vote-button' onClick={handleResetVote}>투표 다시하기</button>
              <button className='vote-detail-page-vote-button' onClick={handleSubmitVote} disabled={!isSubmitEnabled}>투표하기</button>
            </>
          )}
        </div>
        <CopyLink />
      </div>
    </div>
  );
};

export default VoteDetailPage;