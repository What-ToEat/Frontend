import React, { useState, useEffect, useRef } from 'react';
import './VoteRestaurantCard.css';

const VoteRestaurantCard = ({ option, onClick, isSelected, onViewDetails }) => {
  const [showVoterList, setShowVoterList] = useState(false);
  const voterListRef = useRef(null);

  const handleToggleVoterList = (e) => {
    e.stopPropagation();
    if (option.voterList.length > 0) {
      setShowVoterList(!showVoterList);
    }
  };

  const handleClickOutside = (event) => {
    if (voterListRef.current && !voterListRef.current.contains(event.target)) {
      setShowVoterList(false);
    }
  };

  useEffect(() => {
    if (showVoterList) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showVoterList]);

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
          <div className="vote-restaurant-card-voters" onClick={handleToggleVoterList}>
            <span className="vote-restaurant-card-voters-icon">👤</span>
            <span>득표수: {option.voterList.length}</span>
          </div>
          {showVoterList && (
            <div className="vote-restaurant-card-voter-list-tooltip" ref={voterListRef}>
              <ul className="vote-restaurant-card-voter-list">
                {option.voterList.map((voter, index) => (
                  <li key={index} className="vote-restaurant-card-voter">
                    <p>{voter.nickname}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button onClick={(e) => { e.stopPropagation(); onViewDetails(option); }} className="vote-restaurant-card-button">상세 정보</button>
      </div>
    </div>
  );
};

export default VoteRestaurantCard;
