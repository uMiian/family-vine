import * as React from 'react'

import { useState } from 'react'

export default function WorkingDirectoryExample() {
    // Create state
    const [actualDirectoryPath, setActualDirectoryPath] = useState('');
    const [currentDirectoryPath, setCurrentDirectoryPath] = useState('');

    async function getWorkingDirectory(event) {
        console.log("getting");
        try {
            setActualDirectoryPath(await window.electronAPI.getWorkingDirectory())
        } catch (error) {
            console.error(error);
        }
    }

    async function setWorkingDirectory(event) {
        event.preventDefault();
        try {
            window.electronAPI.setWorkingDirectory(currentDirectoryPath);
        } catch (error) {
            console.error(error);
        }
        setCurrentDirectoryPath('');
    }

    return (
        <>

        <h1>Get Working Directory</h1>
        <p>The current directory is set to: {actualDirectoryPath}</p>
        <button onClick={getWorkingDirectory}>Get</button>
        <h1>Set Working Directory</h1>
        <form onSubmit={setWorkingDirectory}>
            <input onChange={(event) => setCurrentDirectoryPath(event.target.value)}/>
            <br/>
            <button type="submit">Set</button>
        </form>

        </>
    )
}
