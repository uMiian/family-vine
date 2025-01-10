import * as React from 'react';
import '@styles/Input.css';

export default function PrimaryInput({ 
  className,
  value, 
  defaultValue,
  placeholder, 
  onChange, 
  type='text', 
  disabled,
  onClick,
  onFocus,
  onBlur,
}) {
  return (
    <input className={`primary-input ${className}`}
           value={value}
           defaultValue={defaultValue}
           placeholder={placeholder}
           onChange={onChange}
           type={type}
           disabled={disabled}
           onClick={onClick}
           onFocus={onFocus}
           onBlur={onBlur}
    />
  );
}
