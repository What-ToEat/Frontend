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

  useEffect(() => {
    const fetchVoteDetail = async () => {
      try {
        const response = await fetch(`http://43.200.168.42/api/vote/${hash}`);
        const data = await response.json();
        if (data.statusCode === 200) {
          setVoteDetail(data.data);
          setInitialSelection(data.data.voteOptionInfoList.filter(option => option.isSelected).map(option => option.restaurantId));
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
		const date = new Date(expireAt);
		date.setHours(date.getHours() + 9);
		return date.toLocaleString();
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
				<h1>{voteDetail.title}</h1>
				{userInfo && (
					<div>
						<p>닉네임: {userInfo.nickname}</p>
					</div>
				)}
				<p>투표 종료 시각: {formatExpireAt(voteDetail.expireAt)}</p>
				<p>중복 투표: {voteDetail.allowDuplicateVote ? '가능' : '불가능'}</p>
				<h2>Vote Options</h2>
				<ul>
					{voteDetail.voteOptionInfoList.map(option => (
						<VoteRestaurantCard
							key={option.restaurantId}
							option={option}
							onClick={handleRestaurantClick}
							isSelected={selectedRestaurants.includes(option.restaurantId)}
						/>
					))}
				</ul>
				<div>
					<button onClick={handleSubmitVote} disabled={!isSubmitEnabled}>투표하기</button>
					<button onClick={handleResetVote}>투표 다시하기</button>
				</div>
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
    </div>
  );
};

export default VoteDetailPage;
