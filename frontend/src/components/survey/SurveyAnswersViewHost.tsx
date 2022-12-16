import * as React from 'react'
import { Table, TableContainer } from '@mui/material'
import { ApiClient } from '../../apiclient/ApiClient';
import { Player } from '../../apiclient/models/Player';
import { SurveyWithAnswers } from '../../apiclient/models/survey/SurveyWithAnswers';
import { SurveyTableHeader } from './surveyAnswerComponents/SurveyTableHeader';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AllLanguageOutput } from '../common/AllLanguageOutput';
import { SurveyTableBody } from './surveyAnswerComponents/SurveyTableBody';
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow';
import { SubmitButton } from '../common/QuestionSubmitButton';
import SubmitButtonType from '../../enums/SubmitButtonType';

interface SurveyAnswersViewHostProps {
    surveyId: string;
    backAction?: () => void;
}

export const SurveyAnswersViewHost = (props: SurveyAnswersViewHostProps): JSX.Element => {
    const [survey, setSurvey] = React.useState<SurveyWithAnswers>(null);
    const [playerList, setPlayerList] = React.useState<{ [playerId: number]: Player }>({});
    React.useEffect(
        () => {
            ApiClient.getClient().getSurveyForGameWithAnswers(props.surveyId).then(
                value => {
                    setSurvey(value);
                    ApiClient.getClient().getPlayerListing().then(
                        value => {
                            const result: { [playerId: number]: Player } = {};
                            if (value?.teams) {
                                for (const teamId in value.teams) {
                                    value.teams[teamId].forEach((player) => { result[player.id] = player });
                                }
                            }
                            result[value?.self?.id] = value?.self;
                            setPlayerList(result);
                        }
                    )
                }
            );
        },
        [props.surveyId]
    );

    return <AutoScaleMaterialColumn>
        <AutoScaleMaterialRow>
            {survey && <>
                <SubmitButton type={SubmitButtonType.SubmitAnswer} disabled={false} text="Refresh answers" onClick={function (): void {
                    setSurvey(null);
                    ApiClient.getClient().getSurveyForGameWithAnswers(props.surveyId).then(setSurvey);
                }} />
                <AllLanguageOutput text={survey.title} />
                <TableContainer>
                    <Table>
                        <SurveyTableHeader survey={survey} />
                        <SurveyTableBody playerList={playerList} surveyWithAnswer={survey} />
                    </Table>
                </TableContainer></>
            }
            {
                !survey && "Loading surveys, please wait..."
            }
            {props.backAction && <SubmitButton type={SubmitButtonType.SubmitAnswer} disabled={false} text="Back to the table" onClick={props.backAction} />
            }
        </AutoScaleMaterialRow>
    </AutoScaleMaterialColumn>
}