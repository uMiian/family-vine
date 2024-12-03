import * as React from 'react';
import { useState } from 'react';

export default function PersonExample() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [id, setID] = useState(-1);

    async function createPerson() {
        try {
            await window.electronAPI.createPerson(firstName, lastName);
            console.log("Made person");
        } catch (error) {
            console.error(error);
        }
    }

    async function getAllPeople() {
        try {
            console.log((await window.electronAPI.getAllPeople()));
        } catch (error) {
            console.error(error);
        }
    }

    async function getPersonByID() {
        try {
            console.log((await window.electronAPI.getPersonByID(id)));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <h1>Pesron Example</h1>

        <h2>Create Person</h2>
        <div>
            First Name:
            <input onChange={(event) => {setFirstName(event.target.value)}}/>
        </div>
        <div>
            Last Name:
            <input onChange={(event) => {setLastName(event.target.value)}}/>
        </div>
        <button onClick={createPerson}>Create</button>

        <h2>Get all People</h2>
        <button onClick={getAllPeople}>Gotta get get!</button>

        <h2>Get Person by ID</h2>
        ID:<input onChange={(event) => {setID(event.target.value)}}/>
        <button onClick={getPersonByID}>Gotta get get by ID!</button>
        </>
    )

}

