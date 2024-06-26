import React, { useRef, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isTagListExpandedState } from '../../recoil/state';
import SelectableTag from '../Tag/SelectableTag';
import './TagList.css';

const TagList = ({ tags, onSearch, canExpand = true }) => {
  const [isExpanded, setIsExpanded] = useRecoilState(isTagListExpandedState);
  const [maxHeight, setMaxHeight] = useState('109px');
  const tagListRef = useRef(null);

  useEffect(() => {
    if (isExpanded || !canExpand) {
      setMaxHeight(`${tagListRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('109px');
    }
  }, [isExpanded, canExpand]);

  const handleToggle = () => {
    if (canExpand) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className='tag-list-wrapper'>
      <div className='tag-list-header'>
        <span className='tag-list-title'># 태그</span>
        <button className='tag-list-search-button' onClick={onSearch}>조회하기</button>
      </div>
      <div className="tag-list-container">
        <div
          className={`tag-list ${isExpanded ? 'expanded' : 'collapsed'}`}
          style={{ maxHeight }}
          ref={tagListRef}
        >
          {tags.map((tag) => (
            <SelectableTag key={tag.name} name={tag.name} category={tag.category} />
          ))}
        </div>
        {canExpand && (
          <div className="toggle-button-container">
            <button className="toggle-button" onClick={handleToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 10 8"
                className={`triangle ${isExpanded ? 'up' : 'down'}`}
              >
                <path
                  d="M4.13397 0.5C4.51887 -0.166667 5.48113 -0.166666 5.86603 0.5L9.33013 6.5C9.71503 7.16667 9.2339 8 8.4641 8H1.5359C0.766098 8 0.284973 7.16667 0.669873 6.5L4.13397 0.5Z"
                  fill="#F77248"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagList;
