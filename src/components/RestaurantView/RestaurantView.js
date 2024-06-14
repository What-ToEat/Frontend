import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedTagsState } from '../../recoil/state';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import RestaurantModal from '../RestaurantModal/RestaurantModal';
import './RestaurantView.css';

const RestaurantView = ({ restaurants, searchKeyword, onRestaurantClick, selectedRestaurantId }) => {
  const selectedTags = useRecoilValue(selectedTagsState);
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleCardClick = async (restaurantId) => {
    if (onRestaurantClick) {
      onRestaurantClick(restaurantId);
    } else {
      const response = await fetch(`http://43.200.168.42:8080/api/restaurants/${restaurantId}`);
      const result = await response.json();
      setSelectedRestaurant(result.data);
      setShowModal(true);
    }
  };

  console.log('selectedRestaurantId:', selectedRestaurantId);

  const handleClose = () => setShowModal(false);

  return (
    <div className='restaurant-view'>
      <div className='restaurant-grid-title'>
        {searchKeyword ? `# ${searchKeyword} 검색 결과` : '# 여긴 어때요?'}
      </div>
      {restaurants.length > 0 ? (
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <div
              className="restaurant-grid-item"
              key={restaurant.restaurantId}
              onClick={() => handleCardClick(restaurant.restaurantId)}
            >
              <RestaurantCard
                name={restaurant.name}
                thumbnail={restaurant.thumbnail}
                tags={restaurant.tags}
                isSelected={selectedRestaurantId === restaurant.restaurantId}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="no-restaurants">
          조회된 레스토랑이 없습니다.
        </div>
      )}
      {selectedRestaurant && !onRestaurantClick && (
        <RestaurantModal
          show={showModal}
          handleClose={handleClose}
          restaurant={selectedRestaurant}
        />
      )}
    </div>
  );
};

export default RestaurantView;
