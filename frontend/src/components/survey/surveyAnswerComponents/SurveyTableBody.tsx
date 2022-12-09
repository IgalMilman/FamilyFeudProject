import * as React from 'react'
import { TableBody, TableCell, TableRow } from '@mui/material'
import { SurveyWithAnswers } from '../../../apiclient/models/survey/SurveyWithAnswers';
import { Player } from '../../../apiclient/models/Player';
import { SurveyTableBodyRow } from './SurveyTableBodyRow';

interface SurveyTableBodyProps {
    surveyWithAnswer: SurveyWithAnswers;
    playerList: { [playerId: number]: Player };
}

export const SurveyTableBody = (props: SurveyTableBodyProps): JSX.Element => {
    return <TableBody>
        {
            props.surveyWithAnswer.answers.map(
                (value, index) => <SurveyTableBodyRow
                    key={value.id || index}
                    surveyAnswer={value}
                    questionList={props.surveyWithAnswer.questions}
                    playerList={props.playerList}
                />
            )
        }
    </TableBody>
}
