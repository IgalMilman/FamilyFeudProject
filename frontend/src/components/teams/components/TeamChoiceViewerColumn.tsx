import * as React from 'react'
import { Player } from '../../../apiclient/models/Player'
import { getBorderCssClassForTeam } from '../../../enums/TeamColorsCss';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';

interface TeamChoiceViewerColumnProps {
    players: Player[];
    team: 0 | 1 | 2;
}

export const TeamChoiceViewerColumn = (props: TeamChoiceViewerColumnProps): JSX.Element => {
    if (!props.players?.length) {
        return <AutoScaleMaterialColumn></AutoScaleMaterialColumn>
    }
    return <AutoScaleMaterialColumn className={getBorderCssClassForTeam(props.team == 0? undefined : props.team)}>
        {
            props.players.map((player, index) => {
                return <AutoScaleMaterialRow key={index}>
                    {player.first_name}
                </AutoScaleMaterialRow>
            })
        }
    </AutoScaleMaterialColumn>
}