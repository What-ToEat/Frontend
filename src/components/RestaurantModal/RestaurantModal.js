import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RestaurantModal = ({ show, handleClose, restaurant }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{restaurant.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={restaurant.thumbnail} alt={restaurant.name} style={{ width: '100%' }} />
        <div>
          {restaurant.tags.map(tag => (
            <span key={tag.name} className="badge badge-secondary">{tag.name}</span>
          ))}
        </div>
        <div>
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
