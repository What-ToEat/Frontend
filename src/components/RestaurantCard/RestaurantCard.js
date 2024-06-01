import React from 'react';
import Tag from '../Tag/Tag';
import './RestaurantCard.css';

const RestaurantCard = ({ name, thumbnail, tags, onClick }) => {
	const truncatedName = name.length > 11 ? `${name.slice(0, 10)}...` : name;

	return (
    <div className="card" onClick={onClick}>
			<div>
				<div className="card-image">
					<img src={thumbnail} alt={truncatedName} />
				</div>
				<div className="card-content">
					<h2>{truncatedName}</h2>
					<div className="divider"></div>
					<div className="tags">
            {tags.map((tag, index) => (
              <Tag key={index} name={tag.name} category={tag.category} />
            ))}
					</div>
				</div>
			</div>
    </div>
  );
};

export default RestaurantCard;
