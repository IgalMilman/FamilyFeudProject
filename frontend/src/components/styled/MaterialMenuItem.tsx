import MaterialMenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const StyledMaterialMenuItem=styled(MaterialMenuItem)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
    },
  }));

export default StyledMaterialMenuItem;