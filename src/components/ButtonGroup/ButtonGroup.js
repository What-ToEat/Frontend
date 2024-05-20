import React from 'react';
import Button from './Button';

const regions = ['강남', '홍대', '잠실', '건대', '신촌'];
const tags = ['분위기 좋은 카페', '맛있는 베이커리', '데이트하기 좋은 레스토랑', '오늘부터 다이어트', '달려 보자! 회식 장소'];

const ButtonGroup = ({ selectedRegion, setSelectedRegion, selectedTag, setSelectedTag }) => {
  return (
    <div>
      <div>
        {regions.map((region, index) => (
          <Button 
            key={index}
            label={region}
            isSelected={selectedRegion === region}
            onClick={() => setSelectedRegion(region)}
          />
        ))}
      </div>
      <div>
        {tags.map((tag, index) => (
          <Button 
            key={index}
            label={tag}
            isSelected={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
          />
        ))}
      </div>
    </div>
  );
}

export default ButtonGroup;
