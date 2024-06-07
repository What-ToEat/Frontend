import React from 'react';
import './VoteRestaurantCard.css';

const VoteRestaurantCard = ({ option, onClick, isSelected }) => {
  return (
    <li onClick={() => onClick(option.restaurantId)} className={isSelected ? 'vote-restaurant-card-selected' : ''}>
      <strong>{option.restaurantName}</strong>
      <p>Voters: {option.voterList.length}</p>
      <ul>
        {option.voterList.map((voter, index) => (
          <li key={index}>
            <p>{voter.nickname}</p>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default VoteRestaurantCard;
