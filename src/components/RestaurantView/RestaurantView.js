import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedTagsState, selectedNavItemState } from '../../recoil/state';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import './RestaurantView.css';

const RestaurantView = ({ restaurants }) => {
  const selectedTags = useRecoilValue(selectedTagsState);
  const selectedNavItem = useRecoilValue(selectedNavItemState);

  // 필터링 함수 정의
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const isNavItemIncluded = selectedNavItem === '전체' || restaurant.tags.includes(selectedNavItem);
    const areAllTagsIncluded = selectedTags.every(tag => restaurant.tags.includes(tag));

    return isNavItemIncluded && areAllTagsIncluded;
  });

  return (
    <div className='restaurant-view'>
      <div className='restaurant-grid-title'>
        # 여긴 어때요?
      </div>
      <div className="restaurant-grid">
        {filteredRestaurants.map((restaurant, index) => (
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
