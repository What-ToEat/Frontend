import React from 'react';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import './VoteRestaurantGrid.css';

const VoteRestaurantGrid = ({ restaurants, onAddClick }) => {
  return (
    <div className="restaurant-grid">
      {restaurants.map((restaurant, index) => (
        <RestaurantCard key={index} {...restaurant} />
      ))}
      <div className="restaurant-card add-card" onClick={onAddClick}>
        <span>+</span>
      </div>
    </div>
  );
};

export default VoteRestaurantGrid;
