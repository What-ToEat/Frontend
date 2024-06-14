import React from 'react';
import Button from './Button';
import './ButtonGroup.css';

const regions = [
  { name: '강남', image: '/images/gangnam.png' },
  { name: '홍대', image: '/images/hongdae.png' },
  { name: '잠실', image: '/images/jamsil.png' },
  { name: '건대', image: '/images/gundae.png' },
  { name: '신촌', image: '/images/shinchon.png' }
];

const tags = [
  { name: '분위기\n좋은 카페', tags: ['디저트 맛집', '커피 맛집'], image: '/images/cafe.png' },
  { name: '맛있는\n베이커리', tags: ['맛있는 음식', '음료 맛집'], image: '/images/bakery.png' },
  { name: '로맨틱한\n레스토랑', tags: ['분위기 좋은', '친구와 함께'], image: '/images/date.png' },
  { name: '오늘부터\n다이어트', tags: ['신선한 재료', '건강한 음식'], image: '/images/diet.png' },
  { name: '달려 보자!\n회식 장소', tags: ['단체모임', '회식'], image: '/images/party.png' }
];

const ButtonGroup = ({ selectedRegion, setSelectedRegion, selectedTag, setSelectedTag }) => {
  return (
    <div className='button-groups-container'>
      <div className="button-groups-button-box">
        <p className="button-groups-button-box-title">어디서 볼까?</p>
        <div className="button-groups-button-box-grid">
          {regions.map((region, index) => (
            <Button 
              key={index}
              label={region.name}
              isSelected={selectedRegion === region.name}
              onClick={() => setSelectedRegion(region.name)}
              imageSrc={region.image}
            />
          ))}
        </div>
      </div>
      <div className="button-groups-button-box">
        <div className="button-groups-button-box-grid">
          {tags.map((tag, index) => (
            <Button 
              key={index}
              label={tag.name}
              isSelected={JSON.stringify(selectedTag) === JSON.stringify(tag.tags)}
              onClick={() => setSelectedTag(tag.tags)}
              imageSrc={tag.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ButtonGroup;
