import * as React from 'react';
import { useState, useEffect } from 'react';
import '../styles/addmedia.css';
import ChooseFile from './ChooseFile.jsx';
import MediaPreview from './MediaPreview.jsx';
import ChoosePeople from './ChoosePeople.jsx';
import ChooseLocation from './ChooseLocation.jsx';
import ChooseDate from './ChooseDate.jsx';
import CreateDescription from './CreateDescription.jsx';

export default function AddMedia() {

  /** COMPONENT STATE */

  // The file path to the media for db entry
  const [mediaFilePath, setMediaFilePath] = useState('');

  // The id of people in media for db entry
  const [peopleInMedia, setPeopleInMedia] = useState([]); 
  
  // The location id of the place where the media was taken for db entry
  const [mediaLocation, setMediaLocation] = useState(); 

  // The date from when the media was taken for db entry
  const [mediaDate, setMediaDate] = useState();

  // The description of the media for db entry
  const [mediaDescription, setMediaDescription] = useState('');

  // The data needed to preview the image
  const [mediaPreviewData, setMediaPreviewData] = useState('');

  /** EFFECTS */
  const [dbLoaded, setDbLoaded] = useState(false);
  // TODO: Get rid of me
  useEffect(() => {
    async function tempLoadFamilyVine() {
      // Connect to database
      await window.electronAPI.loadFamilyVine();
      setDbLoaded(true);
    }
    tempLoadFamilyVine();
  }, [])

  /** FUNCTIONS */
  async function createMedia() {
    if (!mediaFilePath) {
      throw Error('You should have chosen a media path! In the future, this will open a dialog.');
    }
    try {
      await window.electronAPI.createMedia(
        mediaFilePath,
        mediaDescription,
        peopleInMedia,
        mediaLocation,
        mediaDate,
      )
      console.log('Created media');
      setMediaFilePath('');
      //setMediaDescription('');
    } catch (error) {
        throw error;
    }
  }

  return (
    <div className='add-media-container'>
      {/** CREATE NEW MEDIA */}
      <div className='left-panel'>
        {/** Prompt the user for the media file path */}
        <ChooseFile mediaFilePath={mediaFilePath} setMediaFilePath={setMediaFilePath} />

        {/** Prompt the user for who is in the media*/}
        { dbLoaded ?
        <ChoosePeople peopleInMedia={peopleInMedia} setPeopleInMedia={setPeopleInMedia}/> : "Select family vine"
        }

        {/** Prompt the user for where the media was taken */}
        { dbLoaded ?
        <ChooseLocation mediaLocation={mediaLocation} setMediaLocation={setMediaLocation}/> : "Select family vine"
        }

        {/** Prompt the user for when the media was taken */}
        { dbLoaded ?
        <ChooseDate mediaDate={mediaDate} setMediaDate={setMediaDate}/> : "Select family vine"
        }

        {/** Prompt the user for a description of the media*/}
        { dbLoaded ?
        <CreateDescription mediaDescription={mediaDescription} setMediaDescription={setMediaDescription}/> : "Select family vine"
        }
        
        <button className='confirm-button' onClick={createMedia}>Create Media!</button>
      </div>
      {/** MEDIA PREVIEW */}
      <div className='media-preview'>
        <MediaPreview mediaFilePath={mediaFilePath} />
      </div>
    </div>
  )
}
