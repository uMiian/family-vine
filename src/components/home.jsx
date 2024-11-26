import React, { useState } from 'react';
import './styles/home.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function Home() {
    const [showInputPage, setShowInputPage] = useState(false);
    const [newFamilyVineName, setNewFamilyVineName] = useState('');
    const navigate = useNavigate(); // initialize navigate

    async function createFamilyVine(event) {
        try {
            await window.electronAPI.createFamilyVine(newFamilyVineName);
            navigate('/vine');
        } catch (error) {
            console.error(error);
        }
    }

    async function loadFamilyVine(event) {
        try {
            await window.electronAPI.loadFamilyVine();
            navigate('/vine');
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
                <h1><span>Family Vine</span></h1>
                <p className = "version">V 1.0.0</p>
                {!showInputPage ? (
                    <div className="actions">
                        <div className="action-item">
                            <p className="options-text">Create new Family Vine</p>
                            <button className="action-button" onClick={() => setShowInputPage(true)}>Create</button>
                        </div>
                        <div className="action-item">
                            <p className="options-text">Load Family Vine</p>
                            <button className="action-button" onClick={loadFamilyVine}>Load</button>
                        </div>
                    </div>
                ) : (
                    <div className="input-page">
                        <p className="input-page-options">Enter Vine Name</p>
                        <input onChange={(event) => { setNewFamilyVineName(event.target.value); }} />
                        <div className="button-group">
                            <button className="action-button" onClick={createFamilyVine}>Create</button>
                            <button className="action-button" onClick={() => setShowInputPage(false)}>Back</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
