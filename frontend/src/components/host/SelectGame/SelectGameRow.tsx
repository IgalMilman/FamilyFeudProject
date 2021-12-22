import { Link } from '@mui/material'
import * as React from 'react'
import { GameSelectionOption } from '../../../apiclient/models/GameSelectionOption'
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn'
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'

interface SelectGameRowProps {
    gameDescription: GameSelectionOption;
}

export const SelectGameRow = (props: SelectGameRowProps): JSX.Element => {
    return <AutoScaleMaterialRow>
        <AutoScaleMaterialColumn>{props.gameDescription?.title}</AutoScaleMaterialColumn>
        <AutoScaleMaterialColumn>{props.gameDescription?.gameStatus}</AutoScaleMaterialColumn>
        <AutoScaleMaterialColumn><Link href={props.gameDescription?.url}>Open game</Link></AutoScaleMaterialColumn>
    </AutoScaleMaterialRow>
}