import React, { useRef, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isTagListExpandedState } from '../../recoil/state';
import SelectableTag from '../Tag/SelectableTag';
import './TagList.css';

const TagList = ({ tags }) => {
  const [isExpanded, setIsExpanded] = useRecoilState(isTagListExpandedState);
  const [maxHeight, setMaxHeight] = useState('109px');
  const tagListRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      setMaxHeight(`${tagListRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('109px');
    }
  }, [isExpanded]);

	const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='tag-list-wrapper'>
      <span className='tag-list-title'># 태그</span>
      <div className="tag-list-container">
        <div
          className={`tag-list ${isExpanded ? 'expanded' : 'collapsed'}`}
          style={{ maxHeight }}
          ref={tagListRef}
        >
          {tags.map((tag) => (
            <SelectableTag key={tag} name={tag} />
          ))}
        </div>
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
      </div>
    </div>
  );
};

export default TagList;
