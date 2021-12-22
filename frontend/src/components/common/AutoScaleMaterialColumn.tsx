import { Grid } from '@mui/material';
import * as React from 'react';

export function AutoScaleMaterialColumn(props: any): JSX.Element {
    return <Grid
        container
        direction="column"
        item
        xs
        className="ffcol"
        alignItems="center"
        justifyContent="center"
        {...props}
    />
}