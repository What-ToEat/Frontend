import React from 'react';
import './QueryButton.css';

const QueryButton = ({ isEnabled, handleQuery }) => {
  return (
    <button className='home-query-button' 
      onClick={handleQuery} 
      disabled={!isEnabled}>
      조&nbsp;&nbsp;&nbsp;회
    </button>
  );
}

export default QueryButton;
