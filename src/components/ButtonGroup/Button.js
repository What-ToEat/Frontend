import React from 'react';

const Button = ({ label, isSelected, onClick }) => {
  return (
    <button 
      onClick={onClick}
      style={{ backgroundColor: isSelected ? 'orange' : 'white' }}
    >
      {label}
    </button>
  );
}

export default Button;
