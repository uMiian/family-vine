import * as React from 'react'

import { useState } from 'react'

export default function WorkingDirectoryExample() {
    // Create state
    const [actualDirectoryPath, setActualDirectoryPath] = useState('');
    const [currentDirectoryPath, setCurrentDirectoryPath] = useState('');
    const [filePath, setFilePath] = useState('');

    async function getWorkingDirectory(event) {
        try {
            setActualDirectoryPath(await window.electronAPI.getWorkingDirectory())
        } catch (error) {
            console.error(error);
        }
    }

    async function setWorkingDirectory(event) {
        event.preventDefault();
        try {
            await window.electronAPI.setWorkingDirectory(currentDirectoryPath);
        } catch (error) {
            console.error(error);
        }
        setCurrentDirectoryPath('');
    }

    async function getFileLocation(event) {
        try {
            setFilePath((await window.electronAPI.getFileLocation())[0]);
        } catch (error) {
            console.error(error);
        }
    }
    
    async function saveFileToWorkingDirectory(event) {
        try {
            await window.electronAPI.saveFileToWorkingDirectory(filePath);
        } catch (error) {
            console.error(error);
        }
    }

    async function removeFileFromWorkingDirectory(event) {
        try {
            await window.electronAPI.removeFileFromWorkingDirectory('example.png');
        } catch(error){
            console.error(error);
        }
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
        <h1>Get and Save File</h1>
        <p>File Location: {filePath}</p>
        <br />
        <button onClick={getFileLocation}>Get File</button>
        <button onClick={saveFileToWorkingDirectory}>Save File to working directory</button>
        <button onClick={removeFileFromWorkingDirectory}> Remove file from working directory</button>
        </>
    )
}
