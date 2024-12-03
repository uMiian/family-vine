import * as React from 'react';

export default function CreateDescription({ mediaDescription, setMediaDescription }) {
  return (
    <>
    <div className='input-group'>
      <input 
        type='text'
        placeholder='Describe the media!'
        onChange={(inputValue) => setMediaDescription(inputValue)}
      />
    </div>
    </>
  )
}
