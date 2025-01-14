import React from 'react';

import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';

const WhiteTextField = styled(TextField)(({ theme }) => ({
  input: { color: 'white'},
  label: { color: 'white'},
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'white', // Label color when focused
  },
  '.MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: 'white', // Default border color
    },
    '&:hover fieldset': {
      borderColor: 'white', // Hover border color
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white', // Focused border color
    },
  },
}));

export default WhiteTextField;
