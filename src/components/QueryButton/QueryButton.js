import React from 'react';
import './QueryButton.css';

const QueryButton = ({ isEnabled }) => {
  return (
    <button className='home-query-button' disabled={!isEnabled}>
      조&nbsp;&nbsp;&nbsp;회
    </button>
  );
}

export default QueryButton;
