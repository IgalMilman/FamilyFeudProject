import { Grid } from '@mui/material';
import * as React from 'react';

export function AutoScaleMaterialRow(props: any): JSX.Element {
    const propsFixed: any = {...props};
    propsFixed['className'] = ('className' in props) ? `ffrow ${props.className}` : 'ffrow';
    return <Grid
        container
        direction="row"
        item
        xs
        alignItems="center"
        justifyContent="center"
        {...propsFixed}
    />
}