import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const WhiteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: grey[200],
  },
}));

export default WhiteButton;
