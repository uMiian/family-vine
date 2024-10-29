import React, { useState, useEffect } from 'react';
import './styles/addmedia.css';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

function AddMedia() {
    const [mediaCreationStatus, setMediaCreationStatus] = useState("Try to add Media!");
    const [medias, setMedias] = useState([]);
    const [attributes, setAttributes] = useState({
        where: '',
        who: '',
        when: '',
        what: '',
        why: '',
    });

    // Open a file dialog and update the filepath
    async function addMedia() {
        let failed = await window.electronAPI.createMedia();
        setMediaCreationStatus(failed ? "Failed to add media to DB :(" : "Successfully added media to DB!");
    }

    // async function getMedia() {
    //     const mediaList = await window.electronAPI.getMedia();
    //     setMedias(mediaList); // Updates medias state with the result
    // }

    useEffect(() => {
        // Log medias after the state is updated
        console.log('Medias updated:', medias);
    }, [medias]);

    useEffect(() => {
        new AirDatepicker('#when-input', {
            autoClose: true,
            locale: {
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                today: 'Today',
                clear: 'Clear',
                dateFormat: 'yyyy-mm-dd',
            },
            onSelect: ({ date }) => {
                setAttributes(prevState => ({
                    ...prevState,
                    when: date.toISOString().split('T')[0],
                }));
            },
        });
    }, []);

    const handleAttributeChange = (event) => {
        const { name, value } = event.target;
        setAttributes(prevState => ({
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
