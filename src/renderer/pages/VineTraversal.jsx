import * as React from 'react';
import { useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import WhiteButton from '@components/WhiteButton.jsx';
import WhiteTextField from '@components/WhiteTextField.jsx';

const drawerWidth = 320;

export default function VineTraversal() {
  /* STATE */
  const [mediaFilepath, setMediaFilepath] = useState('');

  // TODO: Get All People, locations, etc.
  const people = []
  for (var i = 0; i < 5; i++) {
    people.push({
      key: i + 1,
      name: `person${i+1}`,
    })
  }

  const locations = []
  for (var i = 0; i < 5; i++) {
    locations.push({
      key: i + 1,
      name: `location${i+1}`,
    })
  }

  /* HANDLERS */
  async function handleChooseMediaButtonClick(event) {
    // TODO: Get a media file from the user
    setMediaFilepath('path/to/media');
  }
  return (
    <Box
      sx={{ 
        display: "flex",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      {/* Filter for specific Media */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': (theme) => ({
            backgroundColor: theme.palette.primary.main,
            width: drawerWidth,
            boxSizing: 'border-box',
          }),
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Media Search Form Header */}
        <Typography color="secondary" variant="h5" align="center">
          Media Search
        </Typography>

        <Stack 
          padding={2} 
          spacing={1}
          sx={{
            height: "100%",
            justifyContent: "space-evenly",
          }}
        >
          {/* People In Media Selection */}
          <Stack>
            <Typography color="white" variant="h6" flexGrow>
              People In Media
            </Typography>
            <Autocomplete 
              size="small"
              multiple
              limitTags={1}
              options={people}
              getOptionLabel={(option) => option.name}
              popupIcon=<ArrowDropDownIcon color="secondary" />
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      color="secondary"
                      variant="filled"
                      label={option.name}
                      size="small"
                      {...tagProps}
                    />
                  );
                })
              }
              renderInput={(params) => (
                <WhiteTextField
                  {...params}
                  variant="outlined"
                  size="small"
                  placeholder="People"
                />
              )}
              sx={{
                '.MuiAutocomplete-endAdornment': {
                  color: 'white',
                }
              }}
            />
          </Stack>

          {/* People Who Captured Media Selection */}
          <Stack>
            <Typography color="white" variant="h6" flexGrow>
              People Who Captured Media
            </Typography>
            <Autocomplete 
              size="small"
              multiple
              limitTags={1}
              options={people}
              getOptionLabel={(option) => option.name}
              popupIcon=<ArrowDropDownIcon color="secondary" />
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      color="secondary"
                      variant="filled"
                      label={option.name}
                      size="small"
                      {...tagProps}
                    />
                  );
                })
              }
              renderInput={(params) => (
                <WhiteTextField
                  {...params}
                  variant="outlined"
                  size="small"
                  placeholder="People"
                />
              )}
            />
          </Stack>

          {/* When The Media was Taken Selection*/}
          <Stack>
            <Typography color="white" variant="h6" flexGrow>
              When The Media Was Captured
            </Typography>
            <DatePicker 
              slots={{
                textField: WhiteTextField
              }}
              slotProps={{
                openPickerIcon: {
                  color: 'secondary',
                },
              }}
            />
          </Stack>

          {/* Where the media was Taken Selection */}
          <Stack>
            <Typography color="white" variant="h6" flexGrow>
              Where The Media Was Taken
            </Typography>
            <Autocomplete 
              size="small"
              multiple
              limitTags={1}
              options={locations}
              getOptionLabel={(option) => option.name}
              popupIcon=<ArrowDropDownIcon color="secondary" />
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      color="secondary"
                      variant="filled"
                      label={option.name}
                      size="small"
                      {...tagProps}
                    />
                  );
                })
              }
              renderInput={(params) => (
                <WhiteTextField
                  {...params}
                  variant="outlined"
                  size="small"
                  placeholder="Locations"
                />
              )}
            />
          </Stack>
          

          {/* Why the media was Taken Selection */}
          <Stack>
            <Typography color="white" variant="h6" flexGrow>
              Description of the Media
            </Typography>
            <WhiteTextField 
              multiline
              rows={6}
              InputProps={{
                style: {
                  overflow: "auto",
                }
              }}
            />
          </Stack>
        
          {/* Create Button */}
          <WhiteButton>Filter</WhiteButton>
        </Stack>
      </Drawer>
    </Box>
  )
}
