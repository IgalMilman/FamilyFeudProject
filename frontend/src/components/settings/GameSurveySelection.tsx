import { Table, TableBody, TableContainer } from '@mui/material';
import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { GameAction } from '../../apiclient/models/GameAction';
import { SurveySummary } from '../../apiclient/models/survey/SurveySummary';
import AppMode from '../../enums/AppModes';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { MainGameContentProps } from '../common/MainGameContentProps';
import { SurveyAnswersViewHost } from '../survey/SurveyAnswersViewHost';
import { GameSurveyTableRow } from './GameSurveyTableRow';

enum ScreenState {
    Loading, Table, Review
}

export function GameSurveySelection(props: MainGameContentProps): JSX.Element {
    const [surveyList, setSurveyList] = React.useState<SurveySummary[]>(null);
    const [surveyId, setSurveyId] = React.useState<string>(null);
    const [state, setState] = React.useState<ScreenState>(ScreenState.Loading);
    const surveySelection = (surveyId: string) => {
        const action = new GameAction();
        action.survey_id = surveyId;
        action.action = 'set_survey';
        console.log(action);
        ApiClient.getClient().performActionOnGame(action).then(
            value => {
                if (value) {
                    props.changeAppMode(AppMode.QuestionMode);
                }
            }
        );
    }
    const surveyReview = (surveyId: string) => {
        setSurveyId(surveyId);
        setState(ScreenState.Review);
    }
    React.useEffect(
        () => {
            ApiClient.getClient().getSurveySummaries().then((value)=>{
                setSurveyList(value);
                setState(ScreenState.Table);   
            });
        }
        , []);
    return <AutoScaleMaterialColumn>
        {(state == ScreenState.Table) && <TableContainer>
            <Table>
                <TableBody>
                    {surveyList.map(
                        (surveySummary, index) => <GameSurveyTableRow
                            selectSurvey={surveySelection}
                            reviewSurvey={surveyReview}
                            surveySummmary={surveySummary}
                            key={surveySummary.id || index}
                        />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        }
        { (state == ScreenState.Review) && <SurveyAnswersViewHost surveyId={surveyId} /> }
        { (state == ScreenState.Loading) && "Loading surveys..."}
    </AutoScaleMaterialColumn>

}