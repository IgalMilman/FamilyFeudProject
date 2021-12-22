import * as React from 'react'
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { Typography } from '@mui/material';

interface GameContentDashboardColumnProps {
    firstRow: String;
    secondRow?: String;
    thirdRow?: String;
    className?: String;
}

export function GameContentDashboardColumn(props: GameContentDashboardColumnProps): JSX.Element {
    return <AutoScaleMaterialColumn className={props.className} spacing={2}>
        <AutoScaleMaterialRow>
            <Typography variant="h3">{props.firstRow}</Typography>
        </AutoScaleMaterialRow>
        {
            props.secondRow && <AutoScaleMaterialRow>
                <Typography variant="h4">
                    {props.secondRow}
                </Typography>
            </AutoScaleMaterialRow>
        }
        {
            props.thirdRow && <AutoScaleMaterialRow>
                <Typography variant="h5">
                    {props.thirdRow}
                </Typography>
            </AutoScaleMaterialRow>
        }
    </AutoScaleMaterialColumn>
}