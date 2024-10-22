import React from 'react';
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import './styles/home.css';

function Home() {
    // Create state 
    const [newFamilyVineName, setNewFamilyVineName] = useState('');

    async function createFamilyVine(event) {
        try {
            await window.electronAPI.createFamilyVine(newFamilyVineName);
        } catch (error) {
            console.error(error);
        }
    }

    async function loadFamilyVine(event) {
        try {
            await window.electronAPI.loadFamilyVine();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="home-container">
            <div className="sidebar">
                <h2>Family Vines</h2>
            </div>
            <div className="main-content">
                <img src="/images/logo.png" alt="Family Vine Logo" className="logo" />
                <h1>Family Vine</h1>
                <p>V 1.0.0</p>
                <div className="actions">
                    <div className="action-item">
                        <p>Create new Family Vine</p>
                        <br />
                        <p>New Family Vine Name</p><input onChange={(event) => {setNewFamilyVineName(event.target.value)}}/>
                        <button className="action-button" onClick={createFamilyVine}>Create</button>
                    </div>
                    <div className="action-item">
                        <p>Load Family Vine</p>
                            <button className="action-button" onClick={loadFamilyVine}>Load</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
