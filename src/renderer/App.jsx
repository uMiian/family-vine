import '@styles/reset.css';
import '@styles/App.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router';
import { Link } from 'react-router'; // TODO: Get rid of me after testing
import VineSelection from '@pages/VineSelection.jsx';
import VineTraversal from '@pages/VineTraversal.jsx';
import MediaCreation from '@pages/MediaCreation.jsx';
import MediaPreview from '@pages/MediaPreview.jsx';

export default function App() {
  return (
    <div>
      <HashRouter>
        <div>
          <Link to='/'>Vine Selection</Link>
          <br />
          <Link to='/traversal'>Vine Traversal</Link>
          <br />
          <Link to='/media/creation'>Media Creation</Link>
          <br />
          <Link to='/media/preview'>Media Preview</Link>
        </div>
        <Routes>
          <Route path="/" element={<VineSelection />} />
          <Route path="/traversal" element={<VineTraversal />} />
          <Route path="/media/creation" element={<MediaCreation />} />
          <Route path="/media/preview" element={<MediaPreview />} />
        </Routes>
      </HashRouter>
    </div>
  )
}
