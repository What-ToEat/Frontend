import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantModal from '../RestaurantModal/RestaurantModal';
import './ActionButtons.css';

const ActionButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const navigate = useNavigate();

  const handleRecommendClick = async () => {
    try {
      const response = await fetch('http://43.200.168.42:8080/api/restaurants/random');
      const result = await response.json();
      setSelectedRestaurant(result.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching random restaurant:', error);
    }
  };

  const handleVoteClick = () => {
    navigate('/vote');
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className='action-button-container'>
      <button className="action-button action-button-recommend" onClick={handleRecommendClick}>
        <div className="action-button-icon"></div>
        <p className='action-button-content'>추&nbsp;&nbsp;&nbsp;천</p>
      </button>
      <button className="action-button action-button-vote" onClick={handleVoteClick}>
        <div className="action-button-icon"></div>
        <p className='action-button-content'>함께 고르기</p>
      </button>
      {selectedRestaurant && (
        <RestaurantModal
          show={showModal}
          handleClose={handleClose}
          restaurant={selectedRestaurant}
        />
      )}
    </div>
  );
}

export default ActionButtons;
