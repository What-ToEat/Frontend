import React from 'react';

const QueryButton = ({ isEnabled }) => {
  return (
    <button disabled={!isEnabled}>
      조회
    </button>
  );
}

export default QueryButton;
