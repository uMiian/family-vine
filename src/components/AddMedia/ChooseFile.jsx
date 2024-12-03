import * as React from 'react';
import { useState, useEffect } from 'react';
import '../styles/addmedia.css';

export default function ChooseFile({mediaFilePath, setMediaFilePath}) {
  /** COMPONENT STATE */
  // The base file name for the media file
  const [baseMediaName, setBaseMediaName] = useState('');

  /** EFFECTS */
  useEffect(() => {
    if (!mediaFilePath) {
      setBaseMediaName('');
    }
  }, [mediaFilePath])

  /** COMPONENT FUNCTIONS */

  async function getMediaFilePath(event) {
    try {
      // Get the path to a media file from electron API
      const filepath = await window.electronAPI.getMediaFilePath();

      // If the user didn't select anything, exit the function
      if (!filepath) {
        setMediaFilePath('');
        setBaseMediaName('');
        return;
      }
      
      // Set the new media file path
      setMediaFilePath(filepath);

      // Set the base file name
      let basename = await window.electronAPI.getBaseMediaName(filepath)
      setBaseMediaName(basename);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
        {/** Let the user select a media file */}
        <button className='custom-file-upload' onClick={getMediaFilePath}>
          { baseMediaName || 'Choose File' }
        </button>
    </>
  )
}
