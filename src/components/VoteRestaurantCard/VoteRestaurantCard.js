import React from 'react';
import './VoteRestaurantCard.css';

const VoteRestaurantCard = ({ option, onClick, isSelected, onViewDetails }) => {
  return (
    <div className={`vote-restaurant-card ${isSelected ? 'vote-restaurant-card-selected' : ''}`} onClick={() => onClick(option.restaurantId)}>
      <div className="vote-restaurant-card-left">
        <div
          className="vote-restaurant-card-thumbnail"
          style={{ backgroundImage: `url(${option.thumbnail})` }}
        ></div>
      </div>
      <div className="vote-restaurant-card-right">
        <div className="vote-restaurant-card-details">
          <strong className="vote-restaurant-card-name">{option.restaurantName}</strong>
          <div className="vote-restaurant-card-voters">
            <span className="vote-restaurant-card-voters-icon">👤</span>
            <span>득표수: {option.voterList.length}</span>
          </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onViewDetails(option); }} className="vote-restaurant-card-button">상세 정보</button>
      </div>
    </div>
  );
};

export default VoteRestaurantCard;
