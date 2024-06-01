import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSwipeable } from 'react-swipeable';
import Tag from '../Tag/Tag';
import './RestaurantModal.css';

const RestaurantModal = ({ show, handleClose, restaurant }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const titleRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

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

  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
      if (titleRef.current) {
        const parentWidth = titleRef.current.parentElement.clientWidth;
        const titleWidth = titleRef.current.scrollWidth;
        const isTitleOverflowing = titleWidth > parentWidth;
        setIsOverflow(isTitleOverflowing);
      }
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="restaurant-modal-custom" centered>
      <Modal.Body {...handlers} className="restaurant-modal-body-custom">
        <div
          className="restaurant-modal-thumbnail"
          style={{ backgroundImage: `url(${restaurant.thumbnail})` }}
        />
        <div className={`restaurant-modal-title-wrapper ${isOverflow ? '' : 'center'}`}>
          <h4 
            className={`restaurant-modal-title ${isOverflow ? 'animate' : ''}`} 
            ref={titleRef}
          >
            {restaurant.name}
          </h4>
        </div>
        <div className="restaurant-modal-tag-container">
          {restaurant.tags.map(tag => (
            <Tag key={tag.name} name={tag.name} category={tag.category} />
          ))}
        </div>
        <hr className="restaurant-modal-divider" />
        <div className="restaurant-modal-review-section">
          <h5>방문자 리뷰</h5>
          <div className="restaurant-modal-review-list">
            <div className="restaurant-modal-review-item">
              {restaurant.reviews[currentReviewIndex].review} ({restaurant.reviews[currentReviewIndex].aiReview})
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RestaurantModal;
