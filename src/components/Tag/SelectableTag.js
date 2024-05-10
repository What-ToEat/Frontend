import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedTagsState } from '../../recoil/state';
import './SelectableTag.css';

const SelectableTag = ({ name }) => {
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

  const isSelected = selectedTags.includes(name);

  const handleClick = () => {
    setSelectedTags((prevTags) =>
      prevTags.includes(name) ? prevTags.filter((tag) => tag !== name) : [...prevTags, name]
    );
  };

  const truncatedName = name.length > 13 ? `${name.slice(0, 12)}...` : name;

  return (
    <div className={`selectable-tag ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
      <span className={`selectable-tag-content ${isSelected ? 'selected' : ''}`}># {truncatedName}</span>
    </div>
  );
};

export default SelectableTag;
