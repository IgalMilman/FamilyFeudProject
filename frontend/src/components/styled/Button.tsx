import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton=styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    borderWidth: 10,
    borderColor: theme.palette.primary.light,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
    },
    "&:disabled": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
    }
  }));

export default StyledButton;