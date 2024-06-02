import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TagNav from '../TagNav/TagNav';
import TagList from '../TagList/TagList';
import RestaurantView from '../RestaurantView/RestaurantView';
import VoteRestaurantGrid from '../VoteRestaurantGrid/VoteRestaurantGrid';
import './VoteRestaurantModal.css';

const VoteRestaurantModal = ({ show, onHide, onAdd }) => {
  const [tags, setTags] = useState([]);
  const [step, setStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [gridRestaurants, setGridRestaurants] = useState([]);

	useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = () => {
    fetch("http://43.200.168.42:8080/api/tags")
      .then(response => response.json())
      .then(({ data: { tags } }) => setTags(tags))
      .catch(error => console.error('Error fetching tags:', error));
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  const handleTagSelect = (tags) => {
    setSelectedTags(tags);
  };

  const handleSearch = async () => {
    // Replace with your API call
    const response = await fetch(`http://yourapi.com/restaurants?region=${selectedRegion}&tags=${selectedTags.join(',')}`);
    const result = await response.json();
    setRestaurants(result.data);
    setStep(2);
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleAddRestaurant = () => {
    if (selectedRestaurant) {
      setGridRestaurants([...gridRestaurants, selectedRestaurant]);
      setSelectedRestaurant(null);
      setStep(1);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>식당 추천 받기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <>
            <TagNav onRegionSelect={handleRegionSelect} />
            <TagList tags={tags} onSearch={handleSearch} onTagSelect={handleTagSelect} canExpand={ false } />
          </>
        )}
        {step === 2 && (
          <RestaurantView
            restaurants={restaurants}
            searchKeyword={`${selectedRegion}, ${selectedTags.join(', ')}`}
            onRestaurantSelect={handleRestaurantSelect}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        {step === 2 && (
          <Button variant="secondary" onClick={() => setStep(1)}>
            이전
          </Button>
        )}
        {step === 1 ? (
          <Button variant="primary" onClick={handleSearch}>
            다음
          </Button>
        ) : (
          <Button variant="primary" onClick={handleAddRestaurant}>
            추가하기
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          닫기
        </Button>
      </Modal.Footer>
      <VoteRestaurantGrid restaurants={gridRestaurants} onAddClick={() => setStep(1)} />
    </Modal>
  );
};

export default VoteRestaurantModal;
