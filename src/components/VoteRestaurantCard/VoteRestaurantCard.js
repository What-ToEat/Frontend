import React from 'react';
import './VoteRestaurantCard.css';

const VoteRestaurantCard = ({ option, onClick, isSelected, onViewDetails }) => {
  return (
    <li className={isSelected ? 'vote-restaurant-card-selected' : ''}>
      <div onClick={() => onClick(option.restaurantId)}>
        <strong>{option.restaurantName}</strong>
        <p>Voters: {option.voterList.length}</p>
        <ul>
          {option.voterList.map((voter, index) => (
            <li key={index}>
              <p>{voter.nickname}</p>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => onViewDetails(option)}>View Details</button>
    </li>
  );
};

export default VoteRestaurantCard;
