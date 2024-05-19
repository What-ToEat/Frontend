import React from 'react';
import './Tag.css';

const Tag = ({ name, category }) => {
  // 13글자를 초과할 경우 문자열을 자르고 '...'을 추가
  const truncatedName = name.length > 13 ? `${name.slice(0, 12)}...` : name;

  return (
    <div className='tag'>
      <span className="tag-content"># {truncatedName}</span>
    </div>
  );
};

export default Tag;
