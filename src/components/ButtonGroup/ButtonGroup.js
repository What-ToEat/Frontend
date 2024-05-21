import React from 'react';
import Button from './Button';

const regions = [
  { name: '강남', image: '/images/gangnam.png' },
  { name: '홍대', image: '/images/hongdae.png' },
  { name: '잠실', image: '/images/jamsil.png' },
  { name: '건대', image: '/images/gundae.png' },
  { name: '신촌', image: '/images/shinchon.png' }
];

const tags = [
  { name: '분위기 좋은 카페', image: '/images/cafe.png' },
  { name: '맛있는 베이커리', image: '/images/bakery.png' },
  { name: '데이트하기 좋은 레스토랑', image: '/images/date.png' },
  { name: '오늘부터 다이어트', image: '/images/diet.png' },
  { name: '달려 보자! 회식 장소', image: '/images/party.png' }
];

const ButtonGroup = ({ selectedRegion, setSelectedRegion, selectedTag, setSelectedTag }) => {
  return (
    <div>
      <div>
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
      <div>
        {tags.map((tag, index) => (
          <Button 
            key={index}
            label={tag.name}
            isSelected={selectedTag === tag.name}
            onClick={() => setSelectedTag(tag.name)}
            imageSrc={tag.image}
          />
        ))}
      </div>
    </div>
  );
}

export default ButtonGroup;
