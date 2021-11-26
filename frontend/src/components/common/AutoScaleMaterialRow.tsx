import { Grid } from '@mui/material';
import * as React from 'react';

export function AutoScaleMaterialRow(props: any): JSX.Element {
    return <Grid container direction="row" item xs
        alignItems="center"
        justifyContent="center" {...props} />
}