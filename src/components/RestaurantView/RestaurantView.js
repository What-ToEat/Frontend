import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedTagsState } from '../../recoil/state';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import './RestaurantView.css';

const RestaurantView = ({ restaurants, searchKeyword }) => {
  const selectedTags = useRecoilValue(selectedTagsState);

  // 필터링 함수 정의
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const restaurantTagNames = restaurant.tags.map(tag => tag.name);
    const areAllTagsIncluded = selectedTags.every(tag => restaurantTagNames.includes(tag));
    return areAllTagsIncluded;
  });

  return (
    <div className='restaurant-view'>
      <div className='restaurant-grid-title'>
        {searchKeyword ? `# ${searchKeyword} 검색 결과` : '# 여긴 어때요?'}
      </div>
      {filteredRestaurants.length > 0 ? (
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
      ) : (
        <div className="no-restaurants">
          조회된 레스토랑이 없습니다.
        </div>
      )}
    </div>
  );
};

export default RestaurantView;
