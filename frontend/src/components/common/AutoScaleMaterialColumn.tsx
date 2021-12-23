import { Grid } from '@mui/material';
import * as React from 'react';

export function AutoScaleMaterialColumn(props: any): JSX.Element {
    const propsFixed: any = {...props};
    propsFixed['className'] = ('className' in props) ? `ffcol ${props.className}` : 'ffcol';
    return <Grid
        container
        direction="column"
        item
        xs
        alignItems="center"
        justifyContent="center"
        {...propsFixed}
    />
}