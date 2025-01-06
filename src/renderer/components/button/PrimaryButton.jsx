import * as React from 'react';
import '@styles/Button.css';

export default function PrimaryButton({ children, className, onClick, disabled }) {
  return (
    <button className={`primary-button ${className}`}
            onClick={onClick}
            disabled={disabled}>
      {children}
    </button>
  );
}
