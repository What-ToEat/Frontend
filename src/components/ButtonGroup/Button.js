import React from 'react';
import './Button.css';

const Button = ({ label, isSelected, onClick, imageSrc }) => {
  return (
    <div className='home-button-container'>
      <button
        className='home-button'
        onClick={onClick}
        style={{
          border: isSelected ? '3px solid #F77248' : '1px solid #C3C3C3',
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: '80%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
      </button>
      <p className='home-button-content'>{label}</p>
    </div>
  );
}

export default Button;
