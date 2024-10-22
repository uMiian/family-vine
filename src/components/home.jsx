import React from 'react';
// import { Link } from 'react-router-dom';
import './styles/home.css';

function Home() {
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
                            <button className="action-button">Create</button>
                    </div>
                    <div className="action-item">
                        <p>Load Family Vine</p>
                            <button className="action-button">Load</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
