import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSwipeable } from 'react-swipeable';
import Tag from '../Tag/Tag';
import './RestaurantModal.css';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';

const RestaurantModal = ({ show, handleClose, restaurant }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const titleRef = useRef(null);
  const reviewListRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isReviewOverflow, setIsReviewOverflow] = useState(false);
  const { lockScroll, openScroll } = useBodyScrollLock();
  const [reviewSectionHeight, setReviewSectionHeight] = useState(120); // 초기 높이 설정

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
    const updateReviewSectionHeight = () => {
      const modalHeight = window.innerHeight * 0.7; // 모달 높이 70vh
      const thumbnail = document.querySelector('.restaurant-modal-thumbnail');
      const titleWrapper = document.querySelector('.restaurant-modal-title-wrapper');
      const tagContainer = document.querySelector('.restaurant-modal-tag-container');
      const divider = document.querySelector('.restaurant-modal-divider');
      const reviewTitle = document.querySelector('.restaurant-modal-review-section > h5');

      if (thumbnail && titleWrapper && tagContainer && divider && reviewTitle) {
        const thumbnailHeight = thumbnail.offsetHeight;
        const titleWrapperHeight = titleWrapper.offsetHeight;
        const tagContainerHeight = tagContainer.offsetHeight;
        const dividerHeight = divider.offsetHeight;
        const reviewTitleHeight = reviewTitle.offsetHeight;

        const totalOccupiedHeight = thumbnailHeight + titleWrapperHeight + tagContainerHeight + dividerHeight + reviewTitleHeight;
        const availableHeight = modalHeight - totalOccupiedHeight - 20; // 여유 공간을 위해 약간의 padding 추가

        setReviewSectionHeight(availableHeight > 0 ? availableHeight : 120); // 최소 높이 120px 보장
      }
    };

    if (show) {
      lockScroll();
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

      updateReviewSectionHeight();
      window.addEventListener('resize', updateReviewSectionHeight);

      return () => {
        window.removeEventListener('resize', updateReviewSectionHeight);
      };
    } else {
      openScroll();
      setCurrentReviewIndex(0);
    }

    return () => {
      openScroll();
      setCurrentReviewIndex(0);
    };
  }, [show, lockScroll, openScroll]);

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
          <div className="restaurant-modal-review-header">
            <h5>방문자 리뷰</h5>
            <span className="restaurant-modal-review-pagination">
              {currentReviewIndex + 1} / {restaurant.reviews.length}
            </span>
          </div>
          <div className="restaurant-modal-review-list" ref={reviewListRef} style={{ height: reviewSectionHeight }}>
            <div className="restaurant-modal-review-item" style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}>
              {restaurant.reviews.map((review, index) => (
                <div key={index} className="restaurant-modal-review-content">
                  {review.review.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
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
