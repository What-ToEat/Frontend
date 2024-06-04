import React, { useRef, useState } from 'react';
import VoteForm from '../../components/VoteForm/VoteForm';
import VoteRestaurantGrid from '../../components/VoteRestaurantGrid/VoteRestaurantGrid';
import VoteRestaurantModal from '../../components/VoteRestaurantModal/VoteRestaurantModal';
import VoteHeader from '../../components/VoteHeader/VoteHeader';
import VoteSubmitButton from '../../components/VoteForm/VoteSubmitButton';
import './VotePage.css';

const VotePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef(null);

  const addRestaurant = (restaurant) => {
    if (!restaurants.some(r => r.restaurantId === restaurant.restaurantId)) {
      setRestaurants([...restaurants, restaurant]);
    }
    setShowModal(false);
  };

  const handleSubmit = async ({ title, email, allowDuplicateVote, expirationTime, restaurants }) => {
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
        restaurants: restaurants.map(r => r.restaurantId),
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
    <div className="vote-page">
      <div className="vote-page-header">
        <VoteHeader content="투표 작성" />
      </div>
      <div className="vote-page-body">
        <VoteForm ref={formRef} restaurants={restaurants} onSubmit={handleSubmit} />
        <VoteRestaurantGrid restaurants={restaurants} onAddClick={() => setShowModal(true)} />
      </div>
      <div className="vote-page-footer">
        <VoteSubmitButton onClick={() => formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))} />
      </div>
      <VoteRestaurantModal show={showModal} onHide={() => setShowModal(false)} onAdd={addRestaurant} />
    </div>
  );
};

export default VotePage;
