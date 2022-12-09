import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AllLanguageOutput } from '../common/AllLanguageOutput';
import { Survey } from '../../apiclient/models/survey/Survey';

interface SurveyViewerViewPointProps {
    surveyId: string;
}

export const SurveyViewerViewPoint = (props: SurveyViewerViewPointProps): JSX.Element => {
    const [survey, setSurvey] = React.useState<Survey>(null);
    React.useEffect(
        () => {
            ApiClient.getClient().getSurveyForGame(props.surveyId).then(
                value => {
                    setSurvey(value);
                }
            );
        },
        [props.surveyId]
    );

    return <AutoScaleMaterialColumn>
        <AllLanguageOutput text={survey.title} />
    </AutoScaleMaterialColumn>
}