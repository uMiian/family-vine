import * as React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Example from './components/example.jsx'
import Home from './components/home.jsx';
import AddMedia from './components/addmedia.jsx';
import Vine from './components/vine.jsx';

function App() {
    return (
        <BrowserRouter>
            <div>
                <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li style={{ display: 'inline', marginRight: '20px' }}>
                                <Link to="/" style={{ color: 'blue', textDecoration: 'none' }}>Home</Link>
                            </li>
                            <li style={{ display: 'inline', marginRight: '20px' }}>
                                <Link to="/addmedia" style={{ color: 'blue', textDecoration: 'none' }}>Add Media</Link>
                            </li>
                            <li style={{ display: 'inline', marginRight: '20px' }}>
                                <Link to="/vine" style={{ color: 'blue', textDecoration: 'none' }}>Vine</Link>
                            </li>
                        </ul>
                    </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/addmedia" element={<AddMedia />} />
                    <Route path="/vine" element={<Vine />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />)
