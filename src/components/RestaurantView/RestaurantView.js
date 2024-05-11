import React from 'react';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import './RestaurantView.css';

const RestaurantView = ({ restaurants }) => {
  return (
		<div className='restaurant-view'>
			<div className='restaurant-grid-title'>
				# 여긴 어때요?
			</div>
			<div className="restaurant-grid">
				{restaurants.map((restaurant, index) => (
					<div className="restaurant-grid-item" key={index}>
						<RestaurantCard 
							name={restaurant.name} 
							thumbnail={restaurant.thumbnail} 
							tags={restaurant.tags}
						/>
					</div>
				))}
			</div>
		</div>
  );
};

export default RestaurantView;
