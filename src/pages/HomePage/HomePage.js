import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Logo from '../../components/Logo/Logo';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import QueryButton from '../../components/QueryButton/QueryButton';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import RestaurantView from '../../components/RestaurantView/RestaurantView';

const HomePage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isQueryButtonEnabled = selectedRegion || selectedTag;

  useEffect(() => {
    setIsLoading(true);
    const url = 'http://43.202.161.19:8080/api/restaurants/tag?page=1';
    fetch(url)
      .then(response => response.json())
      .then(({ data: { restaurants } }) => {
        setRestaurants(restaurants);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Logo/>
      <ButtonGroup 
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <QueryButton isEnabled={isQueryButtonEnabled} />
      <div className='home-page-content'>
        <div className='home-page-divider'></div>
        <ActionButtons />
        <RestaurantView 
            restaurants={restaurants} 
            searchKeyword={''} 
          />
        {isLoading && (
          <div className="view-page-loading">
            <div className="spinner"></div>
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
