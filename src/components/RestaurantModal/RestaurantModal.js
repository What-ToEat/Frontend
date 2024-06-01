import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSwipeable } from 'react-swipeable';
import Tag from '../Tag/Tag';

const RestaurantModal = ({ show, handleClose, restaurant }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const handlePrevReview = () => {
    setCurrentReviewIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : restaurant.reviews.length - 1
    );
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) => 
      prevIndex < restaurant.reviews.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextReview(),
    onSwipedRight: () => handlePrevReview(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{restaurant.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={restaurant.thumbnail} alt={restaurant.name} style={{ width: '100%' }} />
        <div style={{ maxHeight: '100px', overflowY: 'scroll', marginTop: '10px' }}>
          {restaurant.tags.map(tag => (
            <Tag key={tag.name} name={tag.name} category={tag.category} />
          ))}
        </div>
        <div style={{ marginTop: '10px' }}>
          <h5>리뷰</h5>
          <div {...handlers} style={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="secondary" onClick={handlePrevReview} style={{ marginRight: '10px' }}>
              이전
            </Button>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              <li>
                {restaurant.reviews[currentReviewIndex].review} ({restaurant.reviews[currentReviewIndex].aiReview})
              </li>
            </ul>
            <Button variant="secondary" onClick={handleNextReview} style={{ marginLeft: '10px' }}>
              다음
            </Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RestaurantModal;
