import React from 'react';
import { useState } from 'react';

import PrimaryInput from '@components/input/PrimaryInput.jsx';

export default function PrimaryMultiSelect({
  placeholder,
  options,
  selectedOptions,
  onSelect,
}) {
  /* STATE */
  const [isSelecting, setIsSelecting] = useState(false);

  /* HANDLERS */
  function onOptionSelect(event) {
    // Create an updated list of selected options
    // depending on what was just selected
    const selectedOption = event.target.value;
    const isInSelected = selectedOptions.includes(selectedOption);
    const updatedOptions = isInSelected ?
      selectedOptions.filter((option) => option !== selectedOption) :
      [...selectedOptions, selectedOption]

    // Call parent component's on option select function
    onSelect(updatedOptions)
  }

  return (
    <div className='primary-multi-select'>
      <PrimaryInput 
        placeholder={placeholder} 
        value={selectedOptions.join(', ')}
        
        // Change the visibility of the dropdown selection
        onFocus={() => {console.log(true); setIsSelecting(true); }}
      />
      <br />
      <select 
        hidden={!isSelecting}
        multiple 
        value={selectedOptions}
      >
        {options.map((option, index) => (
          <option onClick={onOptionSelect} key={index}>{option.name}</option>
        ))}
      </select>
    </div>
  )
}
