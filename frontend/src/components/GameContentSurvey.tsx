import * as React from 'react'
import { ClientRole } from '../enums/ClientRole';
import { MainGameContentProps } from './common/MainGameContentProps';
import { SurveyAnswersViewHost } from './survey/SurveyAnswersViewHost';
import { SurveyFormParticipant } from './survey/SurveyFormParticipant';
import { SurveyViewerViewPoint } from './survey/SurveyViewerViewPoint';

export function GameContentSurvey(props: MainGameContentProps): JSX.Element {
    let mainElement = undefined;
    switch (props.currentRole) {
        case (ClientRole.Host):
            mainElement = <SurveyAnswersViewHost surveyId={props.game?.current_survey} />
            break;
        case (ClientRole.Viewer):
            mainElement = <SurveyViewerViewPoint surveyId={props.game?.current_survey} />
            break;
        case (ClientRole.Participant):
            mainElement = <SurveyFormParticipant surveyId={props.game?.current_survey} />
            break;
    }
    return props.game?.current_survey ? mainElement : <></>;
}
