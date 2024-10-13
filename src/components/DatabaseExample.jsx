import * as React from 'react'

import { useState } from 'react'

export default function DatabaseExample() {
    // Current database connection
    const [dbPath, setDbPath] = useState('');
    const [newDbPath, setNewDbPath] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    async function connectToDatabase(event) {
        event.preventDefault();
        // Connect to the database
        try {
            await window.electronAPI.connectToDatabase(dbPath);
            setIsConnected(true);
            setDbPath('');
        } catch (error) {
            console.error(error);
        }
    }

    async function disconnectFromDatabase(event) {
        // Disconnect from database
        try {
            await window.electronAPI.disconnectFromDatabase();
            setIsConnected(false);
        } catch (error) {
            console.error(error);
        }
    }

    async function createNewDatabase(event) {
        event.preventDefault();
        // Create a new database and connect to it
        try {
            await window.electronAPI.createNewDatabase(newDbPath);
            setIsConnected(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

        <h1>Connect to database</h1>
        <div>
            {isConnected ? <p>The database is connected </p>: <p></p>}
        </div>
        <form onSubmit={connectToDatabase}>
            <input type="text" value={dbPath} 
                onChange={(event) => {setDbPath(event.target.value)}}
            />
            <br/>
            <button type="submit">Connect</button>
        </form>
        
        <h1>Disconnect From Database</h1>
        <button onClick={disconnectFromDatabase}>Disconnect</button>
        
        <h1>Create New Database</h1>
        <form onSubmit={createNewDatabase}>
            <input type="text" value={newDbPath} 
                onChange={(event) => {setNewDbPath(event.target.value)}}
            />
            <br/>
            <button type="submit">Connect</button>
        </form>
        </>
    )
}
