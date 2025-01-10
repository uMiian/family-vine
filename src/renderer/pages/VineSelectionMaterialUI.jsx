import React from 'react';

import { useNavigate } from 'react-router';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const WhiteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.white,
  '&:hover': {
    backgroundColor: grey[100],
  },
}));


export default function VineSelectionMaterialUI() {
  let navigate = useNavigate();

  async function handleRecentVineClick(event, recentVine) {
    // Get the path to the vine
    console.log(recentVine.path);

    // Try to load the vine

    // Redirect to vine traversal
  }

  // TODO: Replace with fetch function to get recently visited vines
  const recentVines = []
  for (let i = 0; i < 21; i++) {
    recentVines.push({
      "key": i,
      "name": `Family Vine ${i}`, 
      "path": `path/to/vine${i}`,
    });
  }
  return (
    <Box 
      sx={{ 
        display: "flex",
        height: "100vh"
      }}
    >
      {/* Show the recently visited Family Vines for easy access */}
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
        <Typography color='primary' variant="h4" align="center">
          Recent Vines 
        </Typography>
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
      <Stack
        direction="column"
        sx={{ 
          flexGrow: 1,
          justifyContent: "center", 
          alignItems: "center",
          backgroundColor: "primary.main",
        }}
      >
        <Typography color="white" variant="h2">Family Vine</Typography>
        {/* Create or Load a Family Vine */}
        <Stack>
          <Box>
          <Stack>
              <Typography color="white" variant="h5">
                Create Family Vine
              </Typography>
              <Typography color="white">
                Create a new vine given a name and the directory to make the vine in
              </Typography>
            </Stack>
            <WhiteButton variant="contained" color="white">Create</WhiteButton>
          </Box>
        </Stack>

      </Stack>
    </Box>
  )
}
