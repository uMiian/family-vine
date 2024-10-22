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

        const handleAttributeChange = (event) => {
            const { name, value } = event.target;
            setAttributes((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        };
        

        return (
            <div className="add-media-container">
                <div className="left-panel">
                    <label htmlFor="file-upload" className="custom-file-upload">Choose File</label>
                    <input id="file-upload" type="file" />
                    <div className="input-group">
                        <label htmlFor="where-input">Where</label>
                        <input
                            type="text"
                            id="where-input"
                            name="where"
                            value={attributes.where}
                            onChange={handleAttributeChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="who-input">Who</label>
                        <input
                            type="text"
                            id="who-input"
                            name="who"
                            value={attributes.who}
                            onChange={handleAttributeChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="when-input">When</label>
                        <input
                            type="text"
                            id="when-input"
                            name="when"
                            value={attributes.when}
                            onChange={handleAttributeChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="what-input">What</label>
                        <input
                            type="text"
                            id="what-input"
                            name="what"
                            value={attributes.what}
                            onChange={handleAttributeChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="why-input">Why</label>
                        <input
                            type="text"
                            id="why-input"
                            name="why"
                            value={attributes.why}
                            onChange={handleAttributeChange}
                        />
                </div>
                <button className="confirm-button" onClick={addMedia}>Confirm</button>
                </div>
                <div className="media-preview">
                    <p>Media Preview</p>
                </div>
            </div>
        );
    }

    export default AddMedia;
