import React from 'react';
import { Link } from 'react-router-dom';

function Vineyard() {
    return (
        <div>
            <div className="header">
                <img
                    src="path-to-your-logo" // Replace with the correct logo path
                    alt="Logo"
                />
                <h1>Vineyard</h1>
            </div>
            <div className="content">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="list-item">
                        <input type="checkbox" />
                        <span>Family Dinner.jpeg</span>
                        <span>WHO:</span>
                    </div>
                ))}
                <Link
                    to="/addmedia"
                    style={{
                        display: 'inline-block',
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >
                    Add Media
                </Link>
            </div>
        </div>
    );
}

export default Vineyard;
