import * as React from 'react';
import '@styles/Button.css';
import BackIcon from './backIcon.svg';

export default function BackButton({ children, className, onClick, disabled }) {
  return (
    <button className={`back-button ${className}`}
            onClick={onClick}
            disabled={disabled}>
      <BackIcon className='back-button-icon'/>
    </button>
  );
}
