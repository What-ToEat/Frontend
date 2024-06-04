import React, { useState } from 'react';
import VoteForm from '../../components/VoteForm/VoteForm';
import VoteRestaurantGrid from '../../components/VoteRestaurantGrid/VoteRestaurantGrid';
import VoteRestaurantModal from '../../components/VoteRestaurantModal/VoteRestaurantModal';
import VoteHeader from '../../components/VoteHeader/VoteHeader';
import './VotePage.css';

const VotePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addRestaurant = (restaurant) => {
    if (!restaurants.some(r => r.restaurantId === restaurant.restaurantId)) {
      setRestaurants([...restaurants, restaurant]);
    }
    setShowModal(false);
  };

  return (
    <div className="vote-page">
      <VoteHeader content="투표 작성" />
      <VoteForm restaurants={restaurants} />
      <VoteRestaurantGrid restaurants={restaurants} onAddClick={() => setShowModal(true)} />
      <VoteRestaurantModal show={showModal} onHide={() => setShowModal(false)} onAdd={addRestaurant} />
    </div>
  );
};

export default VotePage;
