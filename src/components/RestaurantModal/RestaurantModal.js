import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Tag from '../Tag/Tag';  // Tag 컴포넌트를 임포트합니다.

const RestaurantModal = ({ show, handleClose, restaurant }) => {
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
          <ul>
            {restaurant.reviews.map((reviewObj, index) => (
              <li key={index}>{reviewObj.review} ({reviewObj.aiReview})</li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RestaurantModal;
