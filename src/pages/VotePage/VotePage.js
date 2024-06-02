import React, { useState } from 'react';
import VoteForm from '../../components/VoteForm/VoteForm';
import VoteRestaurantGrid from '../../components/VoteRestaurantGrid/VoteRestaurantGrid';
import VoteRestaurantModal from '../../components/VoteRestaurantModal/VoteRestaurantModal';
import './VotePage.css';

const VotePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
    setShowModal(false);
  };

  return (
    <div className="vote-page">
      <h2>뭐먹을까?</h2>
      <p>뭐먹을까 투표 페이지입니다.</p>
      <VoteForm restaurants={restaurants} />
      <VoteRestaurantGrid restaurants={restaurants} onAddClick={() => setShowModal(true)} />
      <VoteRestaurantModal show={showModal} onHide={() => setShowModal(false)} onAdd={addRestaurant} />
    </div>
  );
};

export default VotePage;
