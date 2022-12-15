import * as React from 'react'
import { Player } from '../../../apiclient/models/Player'
import { getBorderCssClassForTeam } from '../../../enums/TeamColorsCss';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import StyledButton from '../../styled/Button';

interface PlayerActionHostColumnProps {
    players: Player[];
    team: 0 | 1 | 2;
    leftAction: (plaerId:number)=>void;
    rightAction: (plaerId:number)=>void;
    titleLeftButton: string;
    titleRightButton: string;
}

export const PlayerActionHostColumn = (props: PlayerActionHostColumnProps): JSX.Element => {
    if (!props.players?.length) {
        return <AutoScaleMaterialColumn></AutoScaleMaterialColumn>
    }
    return <AutoScaleMaterialColumn className={getBorderCssClassForTeam(props.team == 0? undefined : props.team)}>
        {
            props.players.map((player, index) => {
                return <AutoScaleMaterialRow key={index}>
                    <AutoScaleMaterialColumn><StyledButton type="button" onClick={() => { props.leftAction(player.id); }}>{props.titleLeftButton}</StyledButton></AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn>{player.first_name}</AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn><StyledButton type="button" onClick={() => { props.rightAction(player.id); }}>{props.titleRightButton}</StyledButton></AutoScaleMaterialColumn>
                </AutoScaleMaterialRow>
            })
        }
    </AutoScaleMaterialColumn>
}