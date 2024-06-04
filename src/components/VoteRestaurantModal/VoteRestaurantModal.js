import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { selectedTagsState, selectedNavItemState } from '../../recoil/state';
import TagNav from '../TagNav/TagNav';
import TagList from '../TagList/TagList';
import RestaurantView from '../RestaurantView/RestaurantView';
import './VoteRestaurantModal.css';

const VoteRestaurantModal = ({ show, onHide, onAdd }) => {
  const [tags, setTags] = useState([]);
  const [step, setStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

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

    fetch(url)
      .then(response => response.json())
      .then(({ data: { restaurants } }) => {
        setRestaurants(restaurants);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
      });
  };

  const handleRestaurantSelect = (restaurantId) => {
    const restaurant = restaurants.find(r => r.restaurantId === restaurantId);
    setSelectedRestaurant(restaurant);
  };

  const handleAddRestaurant = () => {
    if (selectedRestaurant) {
      onAdd(selectedRestaurant);
      setSelectedRestaurant(null);
      setStep(1);
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchRestaurants(selectedRegion, selectedTags, nextPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      fetchRestaurants(selectedRegion, selectedTags, previousPage);
    }
  };

  return (
    <Modal show={show} onHide={onHide} className="vote-restaurant-modal">
      <Modal.Header closeButton>
        <Modal.Title>투표 항목 추가하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <>
            <TagNav onRegionSelect={setSelectedRegion} />
            <TagList tags={tags} onSearch={handleSearch} canExpand={false} />
          </>
        )}
        {step === 2 && (
          <>
            <RestaurantView
              restaurants={restaurants}
              searchKeyword={''}
              onRestaurantClick={handleRestaurantSelect}
            />
            <div className="vote-restaurant-modal-pagination">
              <Button variant="secondary" onClick={handlePreviousPage} disabled={currentPage === 1}>
                이전 페이지
              </Button>
              <p className='vote-restaurant-modal-current-page'>{currentPage} 페이지</p>
              <Button variant="secondary" onClick={handleNextPage}>
                다음 페이지
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {step === 1 && (
          <Button variant="primary" onClick={handleSearch}>
            조회하기
          </Button>
        )}
        {step === 2 && (
          <>
            <Button variant="secondary" onClick={() => setStep(1)}>
              이전
            </Button>
            <Button variant="primary" onClick={handleAddRestaurant}>
              추가하기
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default VoteRestaurantModal;
