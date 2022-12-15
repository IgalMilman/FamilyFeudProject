import { Table, TableBody, TableContainer } from '@mui/material';
import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { GameAction } from '../../apiclient/models/GameAction';
import { SurveySummary } from '../../apiclient/models/survey/SurveySummary';
import AppMode from '../../enums/AppModes';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { MainGameContentProps } from '../common/MainGameContentProps';
import { GameSurveyTableRow } from './GameSurveyTableRow';


export function GameSurveySelection(props: MainGameContentProps): JSX.Element {
    const [surveyList, setSurveyList] = React.useState<SurveySummary[]>(null);
    const surveySelection = (surveyId: string) => {
        const action = new GameAction();
        action.survey_id = surveyId;
        action.action = 'set_survey';
        ApiClient.getClient().performActionOnGame(action).then(
            value => {
                if (value) {
                    props.changeAppMode(AppMode.QuestionMode);
                }
            }
        )
    }
    React.useEffect(
        () => {
            ApiClient.getClient().getSurveySummaries().then(setSurveyList);
        }
        , []);
    return <AutoScaleMaterialColumn>
        {surveyList ? <TableContainer>
            <Table>
                <TableBody>
                    {surveyList.map(
                        (surveySummary, index) => <GameSurveyTableRow
                            surveyAction={surveySelection}
                            surveySummmary={surveySummary}
                            key={surveySummary.id || index}
                        />
                    )}
                </TableBody>
            </Table>
        </TableContainer> : "Loading surveys..."}
    </AutoScaleMaterialColumn>

}