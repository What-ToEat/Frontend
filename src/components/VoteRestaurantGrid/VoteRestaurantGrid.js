import React from 'react';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import './VoteRestaurantGrid.css';

const VoteRestaurantGrid = ({ restaurants, onAddClick }) => {
  return (
    <div className='vote-restaurant-grid-wrapper'>
      <div className='vote-restaurant-grid-header'>
        <p>현재 담긴 레스토랑</p>
      </div>
      <div className='vote-restaurant-grid-container'>
        <div className="vote-restaurant-grid">
          {restaurants.map((restaurant, index) => (
            <div className="vote-restaurant-grid-item" key={index}>
              <RestaurantCard key={index} {...restaurant} />
            </div>
          ))}
          <div className="vote-restaurant-grid-item" onClick={onAddClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="186" height="177" viewBox="0 0 186 177" fill="none">
              <rect x="0.5" y="0.5" width="185" height="176" rx="4.5" fill="white" stroke="#C3C3C3"/>
              <line x1="79" y1="89" x2="107" y2="89" stroke="#C3C3C3" strokeWidth="2"/>
              <path d="M93 75L93 103" stroke="#C3C3C3" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteRestaurantGrid;
