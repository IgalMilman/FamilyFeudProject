import * as React from 'react'
import { QuestionFormParticipant } from './form/participant/QuestionFormParticipant';
import { QuestionFormHost } from './form/host/QuestionFormHost';
import { QuestionFormShow } from './form/show/QuestionFormShow';
import { Question } from '../apiclient/models/Question';
import { ClientRole } from '../enums/ClientRole';
import { MainGameContentProps } from './common/MainGameContentProps';
import { GameStatus } from '../enums/GameStatus';
import { EnterTeamsNamePatricipant } from './form/participant/EnterTeamsParticipant';
import { getTeam } from './common/Utils';

export function GameContentQuestion(props: MainGameContentProps): JSX.Element {
    const question: Question = props.game?.active_question;
    let mainElement = undefined;
    switch (props.currentRole) {
        case (ClientRole.Host):
            mainElement = <QuestionFormHost
                question={question} />
            break;
        case (ClientRole.Viewer):
            mainElement = <QuestionFormShow
                question={question} />
            break;
        case (ClientRole.Participant):
            if (props.game?.status == GameStatus.SETTING_TEAMS) {
                const team = getTeam(props.game, props.teamNumber);
                return <EnterTeamsNamePatricipant teamNumber={props.teamNumber} teamName={team.name} />
            }
            else {
                mainElement = <QuestionFormParticipant
                    teamNumber={props.teamNumber}
                    question={question} />
            }
            break;
    }
    return question ? mainElement : <></>;
}