import React, { useState, useEffect } from 'react';
import './styles/addmedia.css';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

    // **START CREATE NEW PERSON**
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    async function createPerson() {
        const confirmed = window.confirm(`Create person: ${firstName} ${lastName}?`);

        if (!confirmed) {
            return;
        }

        try {
            console.log('Creating person:', firstName, lastName);
            await window.electronAPI.createPerson(firstName, lastName);
            setFirstName('');
            setLastName('');
        } catch (error) {
            console.error(error);
        }
    }
    // **END CREATE NEW PERSON**

    // **START DROPDOWN MENU**
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [people, setPeople] = useState([]);

    const fetchPeople = async () => {
        try {
        const data = await window.electronAPI.getAllPeople();
        setPeople(data);
        } catch (error) {
        console.error('Error fetching people:', error);
        }
    };

    useEffect(() => {
        fetchPeople();
    }, []);

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        const selectedValues = typeof value === 'string' ? value.split(',') : value;
        setPersonName(selectedValues);
    };

    function getStyles(id, personName, theme) {
        return {
        fontWeight:
            personName.indexOf(id) !== -1
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
        };
    }

    // **END DROPDOWN MENU**

    useEffect(() => {
        // Log medias after the state is updated
        console.log('Medias updated:', medias);
    }, [medias]);

    // **START CALENDER DATE PICKER**
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
    // **END CALENDER DATE PICKER**

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

                <div>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <button onClick={createPerson}>Create Person</button>
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
