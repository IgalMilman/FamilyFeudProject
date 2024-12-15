import * as React from 'react'
import { ClientRole } from '../enums/ClientRole';
import { GameStatus } from '../enums/GameStatus';
import { MainGameContentProps } from './common/MainGameContentProps';
import { getTeam } from './common/Utils';
import { EnterTeamsNamePatricipant } from './formElements/participant/EnterTeamsParticipant';
import { GameContentQuestion } from './GameContentQuestion';
import { GameContentSurvey } from './GameContentSurvey';
import { GameContentTeamChoice } from './GameContentTeamChoice';
import { GameContentBet } from './GameContentBet';


export function GameContentScreen(props: MainGameContentProps): JSX.Element {
    switch(props.game?.gameStatus) {
        case GameStatus.QUESTION:
            return <GameContentQuestion {...props} />
        case GameStatus.PLACING_BETS:
            return <GameContentBet {...props} />
        case GameStatus.SURVEY:
            return <GameContentSurvey {...props} />
        case GameStatus.SETTING_TEAMS:
            if (props.currentRole == ClientRole.Participant) {
                const team = getTeam(props.game, props.teamNumber);
                return <EnterTeamsNamePatricipant teamNumber={props.teamNumber} teamName={team.name} />
            }
            return <>Setting up teams...</>
        case GameStatus.CHOOSING_TEAMS:
            return <GameContentTeamChoice {...props} />
        default:
            return <></>
    }
}