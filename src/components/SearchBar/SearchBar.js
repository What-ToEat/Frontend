import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(keyword);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="식당 검색" 
        className="search-input" 
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button className="search-button" onClick={handleSearchClick}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
