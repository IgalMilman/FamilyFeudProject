import { Grid } from '@mui/material';
import * as React from 'react';

export function AutoScaleMaterialAnswerRow(props: any): JSX.Element {
    return <Grid
        container
        direction="column"
        item
        xs
        alignItems="center"
        justifyContent="center"
        {...props} />
}