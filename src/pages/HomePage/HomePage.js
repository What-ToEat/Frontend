import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Logo from '../../components/Logo/Logo';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import QueryButton from '../../components/QueryButton/QueryButton';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import RestaurantView from '../../components/RestaurantView/RestaurantView';

const HomePage = () => {
  const [selectedRegion, setSelectedRegion] = useState('강남');
  const [selectedTag, setSelectedTag] = useState(['분위기 좋은', '친구와 함께']);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isQueryButtonEnabled = selectedRegion || selectedTag.length > 0;

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

  const handleRegionClick = (region) => {
    setSelectedRegion(prevRegion => (prevRegion === region ? null : region));
  };

  const handleTagClick = (tag) => {
    setSelectedTag(prevTag => (prevTag === tag ? [] : tag));
  };

  const navigate = useNavigate();

  const handleQueryClick = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('place', selectedRegion || '전체');
    
    selectedTag.forEach(t => queryParams.append('tags', t));

    navigate(`/view?${queryParams.toString()}`);
  };

  return (
    <div>
      <div className='home-page-header-container'>
        <Logo />
        <ButtonGroup 
          selectedRegion={selectedRegion}
          setSelectedRegion={handleRegionClick}
          selectedTag={selectedTag}
          setSelectedTag={handleTagClick}
        />
        <QueryButton isEnabled={isQueryButtonEnabled} handleQuery={handleQueryClick} />
      </div>
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
