import * as React from 'react';
import { AutoScaleMaterialColumn } from './AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from './AutoScaleMaterialRow';

export const MainView = (props: any): JSX.Element => {
    return <AutoScaleMaterialColumn
        className='mainview'
        container
        direction="column"
        item
        xs
        alignItems="center"
        justifyContent="center"
        spacing={2}>
        <AutoScaleMaterialRow {...props} />
    </AutoScaleMaterialColumn>
}