import React from 'react';
import { useState } from 'react';

import SecondarySidebar from '@components/sidebar/SecondarySidebar.jsx';
import PrimaryButton from '@components/button/PrimaryButton.jsx';
import PrimaryInput from '@components/input/PrimaryInput.jsx';
import PrimaryMultiSelect from '@components/multi-select/PrimaryMultiSelect.jsx';

import '@styles/MediaCreation.css';

export default function MediaCreation() {
  /* STATE */
  const [mediaFilepath, setMediaFilepath] = useState('');
  const [peopleInMedia, setPeopleInMedia] = useState([]); // Array of people IDs
  const [peopleWhoCapturedMedia, setPeopleWhoCapturedMedia] = useState([]); // Array of people IDs
  const [whenMediaWasTaken, setWhenMediaWasTaken] = useState(''); // DateTime object
  const [whereMediaWasTaken] = useState(''); // ID of location

  const [mediaPreviewSrc, setMediaPreviewSrc] = useState('');

  // TODO: Replace test data with actual function calls
  
  // Sample person data
  const people = [{"name": "Person1", "key": 1}, {"name": "Person2", "key": 2}]

  // Sample location Data

  /* Handle Functions */
  function onMediaFileSelection(event) {
    event.preventDefault();
    
    // Try to get a media filepath

    // Preview the file if one was successfully chosen
  }

  function handleCreateMedia(event) {
    event.preventDefault();
    
    // Check all of the data

    // Try to create media
    
    // Display dialog to user if it was successfully made
    // or error message otherwise
    
    // Reset all of the properties so that the user can create another media
  }

  return (
    <div className='media-creation'>
      <SecondarySidebar title="Create Media">
        <form className='creation-form'>
          <PrimaryButton>Choose Media File</PrimaryButton>

          <div className='form-question'>
            <label>People in media</label>
            <br />
            <PrimaryMultiSelect 
              placeholder='Choose People'
              options={people} 
              selectedOptions={peopleInMedia}
              onSelect={setPeopleInMedia}
              />
          </div>

          <div className='form-question'>
            <label>People who captured media</label>
            <br />
            <PrimaryInput />
          </div>

          <div className='form-question'>
            <label>When the media was taken</label>
            <br />
            <PrimaryInput />
          </div>

          <div className='form-question'>
            <label>Where the media was taken</label>
            <br />
            <PrimaryInput />
          </div>
          <PrimaryButton type='submit'>Submit</PrimaryButton>
        </form>
      </SecondarySidebar>
      <div className='media-preview'>
        {!mediaPreviewSrc ?
          <h1>No Media Selected</h1> :
          <img src={mediaPreviewSrc}/>
        }
      </div>
    </div>
  )
}
