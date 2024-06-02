import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { selectedTagsState, selectedNavItemState } from '../../recoil/state';
import TagNav from '../TagNav/TagNav';
import TagList from '../TagList/TagList';
import RestaurantView from '../RestaurantView/RestaurantView';
import VoteRestaurantGrid from '../VoteRestaurantGrid/VoteRestaurantGrid';
import './VoteRestaurantModal.css';

const VoteRestaurantModal = ({ show, onHide, onAdd }) => {
  const [tags, setTags] = useState([]);
  const [step, setStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [gridRestaurants, setGridRestaurants] = useState([]);

  const [selectedRegion, setSelectedRegion] = useRecoilState(selectedNavItemState);
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

  useEffect(() => {
    fetchTags();
    setSelectedRegion('전체');
    setSelectedTags([]);
  }, []);

  const fetchTags = () => {
    fetch("http://43.200.168.42:8080/api/tags")
      .then(response => response.json())
      .then(({ data: { tags } }) => setTags(tags))
      .catch(error => console.error('Error fetching tags:', error));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    console.log('selectedRegion:', selectedRegion);
    console.log('selectedTags:', selectedTags);
    fetchRestaurants(selectedRegion, selectedTags, 1);
    setStep(2);
  };

  const fetchRestaurants = (navItem, tags, page) => {
    let url = `http://43.200.168.42:8080/api/restaurants/tag?page=${page}`;
    if (navItem !== '전체') {
      url += `&place=${encodeURIComponent(navItem)}`;
    }
    if (tags.length > 0) {
      const tagParams = tags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
      url += `&${tagParams}`;
    }

    console.log('url:', url);

    fetch(url)
      .then(response => response.json())
      .then(({ data: { restaurants } }) => {
        console.log('restaurants:', restaurants);
        setRestaurants(restaurants);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
      });
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
            <TagNav onRegionSelect={setSelectedRegion} />
            <TagList tags={tags} onSearch={handleSearch} canExpand={false} />
          </>
        )}
        {step === 2 && (
          <RestaurantView
            restaurants={restaurants}
            searchKeyword={''}
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
