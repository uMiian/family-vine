import * as React from 'react';
import {useState, useEffect} from 'react';

export default function MediaPreview({mediaFilePath}) {

  /** COMPONENT STATE */
  const [mediaData, setMediaData] = useState('');

  /** EFFECTS */
  useEffect(() => {
    // Get the media data needed to preview the media
    async function getPreviewData() {
      if (mediaFilePath) {
        setMediaData(await window.electronAPI.getMediaData(mediaFilePath));
      } else {
        setMediaData('');
      }
    }
    getPreviewData();
  }, [mediaFilePath]);

  return (
    <>
    { mediaData ? 
        (mediaData.startsWith('data:image/') ? 
          <img className='media-preview-image' src={mediaData} />
        : mediaData.startsWith('data:video/') ? 
          <video className='media-preview-video' controls src={mediaData} />
        : "The selected media is not supported!")
      : "Please select a media file!"
    }
    </>
  )
}
