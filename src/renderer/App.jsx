import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { HashRouter, Routes, Route } from 'react-router';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Global, css } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

import VineSelection from '@pages/VineSelection.jsx';
import VineTraversal from '@pages/VineTraversal.jsx';
import MediaCreation from '@pages/MediaCreation.jsx';
import MediaPreview from '@pages/MediaPreview.jsx';

// Import Roboto Font for Material UI import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Create a theme for the application
const theme = createTheme({
  palette: {
    primary: {
      main: "#1f7651", // Green
    },
    secondary: {
      main: '#b6ffde', // Light Green
    },
  }
})

export default function App() {
  return (
      <ThemeProvider theme={theme}>
        {/* Reset browser CSS setttings */}
        <CssBaseline />
        {/* Change the global styling for scrollbar */}
        <Global
          styles={css`
            ::-webkit-scrollbar {
              width: 8px;
            }
            ::-webkit-scrollbar-thumb {
              background-color: ${theme.palette.secondary.main};
              border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background-color: ${theme.palette.secondary.dark};
            }
            ::-webkit-scrollbar-track {
              background-color: #f0f0f0;
            }
          `}
        />
        <HashRouter>
          <Routes>
            <Route path="/selection" element={<VineSelection />} />
            <Route path="/traversal" element={<VineTraversal />} />
            <Route path="/" element={<MediaCreation />} />
            <Route path="/media/preview" element={<MediaPreview />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
  )
}
