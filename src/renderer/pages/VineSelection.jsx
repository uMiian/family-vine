import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import WhiteButton from '@components/WhiteButton.jsx';
import WhiteTextField from '@components/WhiteTextField.jsx';

const drawerWidth = 240;

export default function VineSelectionMaterialUI() {
  let navigate = useNavigate();

  /* STATE */
  const [isCreatingVine, setIsCreatingVine] = useState(false);

  const [newVineFormError, setNewVineFormError] = useState(false);
  const [newVineFormErrorMessage, setNewVineFormErrorMessage] = useState('');
  const [newVineName, setNewVineName ] = useState('');
  const [newVineDirectory, setNewVineDirectory] = useState('');


  // TODO: Replace with fetch function to get recently visited vines
  const recentVines = []
  for (let i = 0; i < 21; i++) {
    recentVines.push({
      "key": i,
      "name": `Family Vine ${i}`, 
      "path": `path/to/vine${i}`,
    });
  }

  /* HANDLERS */
  async function handleRecentVineClick(event, recentVine) {
    // Get the path to the vine
    console.log(recentVine.path);

    // TODO: Try to load the vine

    // Redirect to vine traversal
    navigate('/traversal');
  }

  async function handleLoadVineButtonClick(event) {
    // TODO: Let the user choose a family vine directory
    const familyVineDirectory = 'path/to/vine/directory';

    // TODO: Try to load the family vine

    // Redirect to vine traversal
    navigate('/traversal');
  }

  async function handleCreateVineButtonClick(event) {
    // Show the create vine form
    setIsCreatingVine(true); 
  }

  async function handleBackButtonClick(event) {
    // Go back to Create/Load Vine options
    setIsCreatingVine(false);
  }

  async function handleSubmitCreateVineFormButtonClick(event) {
    // Make sure new vine name and directory are specified
    if (!newVineName) {
      setNewVineFormError(true);
      setNewVineFormErrorMessage('Make sure to give your vine a name!')
      return; } if (!newVineDirectory) {
      setNewVineFormError(true);
      setNewVineFormErrorMessage('Make sure to specify where to make the new vine folder!');
      return;
    }

    // Try creating the new family vine
  
    // Navigate to vine traversal
    navigate('/traversal');
  }

  async function handleChooseNewVineDirectoryButtonClick(event) {
    // Let the user select a directory to make the vine in
    setNewVineDirectory('path/to/directory');
  }

  return (
    <Box
      sx={{ 
        display: "flex",
        height: "100vh",
        backgroundColor: "primary.main",
      }}
    >
      {/* Recent Vines Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography color='primary' variant="h5" align="center">
          Recent Vines 
        </Typography>

        {/* List the recently visited vines */}
        <List>
        {recentVines.map((recentVine) => (
          <ListItem key={recentVine.key} disablePadding>
            <ListItemButton 
                onClick={(event) => handleRecentVineClick(event, recentVine)}
            >
              <ListItemText
                primary={
                  <Typography color="primary" variant="h6">
                    {recentVine.name}
                  </Typography>
                }
                secondary={
                  <Typography color="secondary" sx={{ fontWeight: "light"}}>
                    {recentVine.path}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
        </List>
      </Drawer>

      {/* Main */}
      <Stack
        direction="column"
        spacing={4}
        sx={{ 
          flexGrow: 1,
          justifyContent: "center", 
          alignItems: "center",
        }}
      >
        <Typography color="white" variant="h2">Family Vine</Typography>

        {/* Load/Create a Family Vine */}
        <Stack spacing={2}
          sx={{
            width: 360,
            height: 150,
          }}
        >
        {!isCreatingVine ? (
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack>
                <Typography color="white" variant="h6">
                  Create Vine
                </Typography>
                <Typography color="white" variant="body2">
                  Create a new Family Vine under a folder.
                </Typography>
              </Stack>
              <WhiteButton 
                onClick={handleCreateVineButtonClick}
                sx={{
                  width: 25,
                  px: 5,
                }}
              >
                Create
              </WhiteButton>
            </Stack>

            <Stack direction="row" spacing={2}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack>
                <Typography color="white" variant="h6">
                  Load Vine
                </Typography>
                <Typography color="white" variant="body2">
                  Load a family vine folder.
                </Typography>
              </Stack>
              <WhiteButton
                onClick={handleLoadVineButtonClick}
                sx={{
                  width: 25,
                  px: 5,
                }}
              >
                Load
              </WhiteButton>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Stack>
              <Stack direction="row" spacing={2}
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack>
                  <Typography color="white" variant="h6" flexGrow>
                    Name Your Vine
                  </Typography>
                  <Typography color="white" variant="body2" flexGrow>
                    This is also the folder name.
                  </Typography>
                </Stack>
                <WhiteTextField 
                  value={newVineName}
                  onChange={(e) => setNewVineName(e.target.value)}
                  required
                  label="Vine Name"
                  variant="outlined"
                  size="small"
                  sx={{
                    width: 150,
                  }}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack>
                <Typography color="white" variant="h6">
                  Choose a Folder
                </Typography>
                <Typography color="white" variant="body2">
                  {newVineDirectory ? (
                    newVineDirectory
                  ) : (
                      <>Please choose a folder</>
                  )}
                </Typography>
              </Stack>
            <WhiteButton
              onClick={handleChooseNewVineDirectoryButtonClick}
            >
              Choose
            </WhiteButton>
            </Stack>
            <Stack direction="row">
              <IconButton onClick={handleBackButtonClick}>
                <ArrowBackIcon 
                  sx={{
                    color: "white",
                  }}
                />
              </IconButton>
              <WhiteButton 
                fullWidth
                onClick={handleSubmitCreateVineFormButtonClick}
              >
                Submit
              </WhiteButton>
            </Stack>
          </Stack>
        )}
        </Stack>
        
        {/* Snackbar Alert */}
        <Snackbar 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={newVineFormError} 
          autoHideDuration={6000} 
        >
          <Alert
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {newVineFormErrorMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  )
}
