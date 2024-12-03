import * as React from 'react';
import { useState } from 'react';

export default function LocationExample() {
    const [locationName, setLocationName] = useState("");
    const [id, setID] = useState(-1);

    async function createLocation() {
        try {
            console.log(await window.electronAPI.createLocation(locationName));
        } catch (error) {
            console.error(error);
        }
    }

    async function getAllLocations() {
        try {
            console.log(await window.electronAPI.getAllLocations());
        } catch (error) {
            console.error(error);
        }
    }

    async function getLocationByID() {
        try {
            console.log(await window.electronAPI.getLocationByID(id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h1>Location Example</h1>
            <h2>Location Create</h2>
            Create Location: <input onChange={(event) => {setLocationName(event.target.value)}}/>
            <button onClick={createLocation}>Create</button>
            
            <h2>Get all location</h2>
            <button onClick={getAllLocations}>get get!</button>

            <h2>Get location by ID</h2>
            ID: <input onChange={(event) => {setID(event.target.value)}}/>
            <button onClick={getLocationByID}>Create</button>
        </>
    )
}
