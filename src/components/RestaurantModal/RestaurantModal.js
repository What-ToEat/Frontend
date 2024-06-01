import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSwipeable } from 'react-swipeable';
import Tag from '../Tag/Tag';
import './RestaurantModal.css';
import useBodyScrollLock from '../../hooks/useBodyScrollLock'; // 훅 임포트

const RestaurantModal = ({ show, handleClose, restaurant }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const titleRef = useRef(null);
  const reviewListRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isReviewOverflow, setIsReviewOverflow] = useState(false);
  const { lockScroll, openScroll } = useBodyScrollLock(); // 훅 사용

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
      lockScroll(); // 모달이 열리면 스크롤 막음
      if (titleRef.current) {
        const parentWidth = titleRef.current.parentElement.clientWidth;
        const titleWidth = titleRef.current.scrollWidth;
        const isTitleOverflowing = titleWidth > parentWidth;
        setIsOverflow(isTitleOverflowing);
      }
      if (reviewListRef.current) {
        const reviewHeight = reviewListRef.current.scrollHeight;
        const containerHeight = reviewListRef.current.clientHeight;
        setIsReviewOverflow(reviewHeight > containerHeight);
      }
    } else {
      openScroll(); // 모달이 닫히면 스크롤 허용
    }

    return () => {
      openScroll(); // 컴포넌트가 언마운트될 때도 스크롤 허용
    };
  }, [show, currentReviewIndex, lockScroll, openScroll]);

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
          <div className="restaurant-modal-review-list" ref={reviewListRef}>
            <div className="restaurant-modal-review-item" style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}>
              {restaurant.reviews.map((review, index) => (
                <div key={index} className="restaurant-modal-review-content">
                  {review.review.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                  <p>({review.aiReview})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RestaurantModal;
