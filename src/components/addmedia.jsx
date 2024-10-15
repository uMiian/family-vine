import React, { useState, useEffect } from 'react';
import './styles/addmedia.css';


function AddMedia() {
    const [mediaCreationStatus, setMediaCreationStatus] = useState("Try to add Media!");
    const [medias, setMedias] = useState([]);
    const [attributes, setAttributes] = useState({
        where: '',
        who: '',
        when: '',
        what: '',
        wo: '',
    });

    // Open a file dialog and update the filepath
    async function addMedia() {
        let failed = await window.electronAPI.createMedia();
        if (!failed) {
            setMediaCreationStatus("Successfully added media to DB!");
        } else {
            setMediaCreationStatus("Failed to add media to DB :(");
        }
    }

    async function getMedia() {
        const mediaList = await window.electronAPI.getMedia();
        setMedias(mediaList); // Updates medias state with the result
    }

    useEffect(() => {
        // Log medias after the state is updated
        console.log('Medias updated:', medias);
    }, [medias]);

    const handleAttributeChange = (attr, value) => {
        setAttributes((prevState) => ({
            ...prevState,
            [attr]: value || prompt(`Enter ${attr}`),
        }));
    };

    return (
        <div className="add-media-container">
            <div className="left-panel">
                <label htmlFor="file-upload" className="custom-file-upload">Choose File</label>
                <input id="file-upload" type="file" />
                <button onClick={() => handleAttributeChange('where')}>Where</button>
                <button onClick={() => handleAttributeChange('who')}>Who</button>
                <button onClick={() => handleAttributeChange('when')}>When</button>
                <button onClick={() => handleAttributeChange('whatWhy')}>What/Why</button>
                <button className="confirm-button" onClick={addMedia}>Confirm</button>
            </div>

            <div className="media-preview">
                <p>Media Preview</p>
            </div>
        </div>
    );
}

export default AddMedia;
