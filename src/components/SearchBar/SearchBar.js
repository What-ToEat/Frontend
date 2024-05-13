import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="식당 검색" className="search-input" />
      <button className="search-button">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
