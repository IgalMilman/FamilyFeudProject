import * as React from 'react'
import { ClientRole } from '../enums/ClientRole';
import { MainGameContentProps } from './common/MainGameContentProps';
import { TeamChoiceHost } from './teams/TeamChoiceHost';
import { TeamChoiceViewer } from './teams/TeamChoiceViewer';

export function GameContentTeamChoice(props: MainGameContentProps): JSX.Element {
    let mainElement = undefined;
    switch (props.currentRole) {
        case (ClientRole.Host):
            mainElement = <TeamChoiceHost />
            break;
        case (ClientRole.Viewer):
        case (ClientRole.Participant):
        case (ClientRole.ViewerParticipant):
            mainElement = <TeamChoiceViewer />
            break;
    }
    return mainElement;
}
