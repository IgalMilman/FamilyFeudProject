import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient'
import { SurveyObject } from '../../apiclient/models/createrequests/SurveyObject'
import { Survey } from '../../apiclient/models/survey/Survey'
import { SurveySummary } from '../../apiclient/models/survey/SurveySummary'
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn'
import { ScreenState, TableFormScreenState } from './common/TableFormState'
import { SurveySelectionTable } from './Survey/SurveySelectionTable'
//import { UpsertSurveyScreen } from './Survey/UpsertSurveyScreen'


interface SurveyScreenProps {

}

export const SurveyScreen = (props: SurveyScreenProps): JSX.Element => {
    const [state, setState] = React.useState<ScreenState<Survey>>(new ScreenState());
    const editSurvey = (survey: SurveySummary) => {
        ApiClient.getClient().getSurvey(survey.id).then((value: Survey) => {
            setState(new ScreenState(TableFormScreenState.Form, value));
        })
    }
    let screen: JSX.Element;
    /*switch (state.state) {
        case TableFormScreenState.Table:
            screen = <SurveySelectionTable editSurvey={editSurvey} />
            break;
        case TableFormScreenState.Form:
            screen = <UpsertSurveyForm
                survey={SurveyObject.fromSurvey(state.data)}
                updateData={value => setState(new ScreenState(state.state, value))}
                backToTable={() => setState(new ScreenState())}
            />
            break;
    }*/
    return <>{screen}</>
}