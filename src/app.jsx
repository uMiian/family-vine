import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home.jsx';
import AddMedia from './components/addmedia.jsx';
import Vine from './components/vine.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addmedia" element={<AddMedia />} />
                <Route path="/vine" element={<Vine />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
