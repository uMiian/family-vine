import * as React from 'react';
import { useState } from 'react';

export default function MediaExample() {
    // State for creating new media
    const [newMediaPath, setNewMediaPath] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPersonIds, setNewPersonIds] = useState([]);
    const [newLocationId, setNewLocationId] = useState(-1);
    const [newDateCreated, setNewDateCreated] = useState("");

    // State for getting all media
    const [allMedia, setAllMedia] = useState([]);
    
    // State for finding specific media
    const [mediaId, setMediaId] = useState(-1);

    // Changing State
    async function setPersonIds(event) {
        let idsString = event.target.value;
        console.log(idsString)
        let idsNum = idsString.split(" ").map(num => parseFloat(num.trim()));
        setNewPersonIds(idsNum);
    }

    // Creating Media
    async function createMedia(event) {
        try {
            await window.electronAPI.createMedia(newMediaPath, newDescription, newPersonIds, newLocationId, newDateCreated);
        } catch (error) {
            console.error(error);
        }
    }

    // Get all media
    async function getAllMedia(event) {
        try {
            setAllMedia(await window.electronAPI.getAllMedia());
            console.log(allMedia);
        } catch (error) {
            console.error(error);
        }
    }

    // Get media by Id
    async function getMediaById(event) {
        try {
            console.log(await window.electronAPI.getMediaByID(mediaId));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h1>List Media</h1>
            <button onClick={getAllMedia}>Get all media</button>:

            <h1>Add Media</h1>
            <input 
                placeholder="media file path" 
                onChange={(event) => { setNewMediaPath(event.target.value) }}
            />
            <br />
            <input 
                placeholder="description"
                onChange={(event) => { setNewDescription(event.target.value) }}
            />
            <br />
            <input 
                placeholder="user ids" 
                onChange={ setPersonIds }
            />
            <br />
            <input 
                placeholder="location id"
                onChange={(event) => {setNewLocationId(event.target.value)}}
            />
            <br />
            <input 
                placeholder="when"
                onChange={(event) => {setNewDateCreated(event.target.value)}}
            />
            <button onClick={createMedia}>Create Media</button>

            <h1>Get Media by ID</h1>
            <input 
                placeholder="id" 
                onChange={(event) => {setMediaId(event.target.value)}}
            />
            <button onClick={getMediaById}>Find Media</button>

            <h1>Delete Media</h1>
        </>
    )
}
