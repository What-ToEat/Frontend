import React from 'react';
import './QueryButton.css';

const QueryButton = ({ isEnabled }) => {
  return (
    <button className='home-query-button' disabled={!isEnabled}>
      조&nbsp;&nbsp;&nbsp;회
    </button>
    // 버튼이 disable일 때의 디자인을 추가해줘.
    

  );
}

export default QueryButton;
