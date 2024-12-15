import * as React from 'react'
import { ClientRole } from '../enums/ClientRole';
import { MainGameContentProps } from './common/MainGameContentProps';
import { BetOpportunity } from '../apiclient/models/BetOpportunity';
import { BetProps } from './betting/BetProps';
import { BetFormHost } from './betting/BetFormHost';
import { BetFormViewer } from './betting/BetFormViewer';
import { BetFormParticipant } from './betting/BetFormParticipant';

export function GameContentBet(props: MainGameContentProps): JSX.Element {
    const bet_op: BetOpportunity = props.game?.active_bet;
    let mainElement = undefined;
    const betProps: BetProps = {
        ...props,
        betOpportunity:bet_op,
    }
    switch (props.currentRole) {
        case (ClientRole.Host):
            mainElement = <BetFormHost {...betProps} />
            break;
        case (ClientRole.Viewer):
            mainElement = <BetFormViewer {...betProps} />
            break;
        case (ClientRole.Participant):
            const team = props.game?.teams?.find(t => t.number === props.game.team_on);
            mainElement = <BetFormParticipant {...betProps} team={team} />
    }
    return bet_op ? mainElement : <></>;
}