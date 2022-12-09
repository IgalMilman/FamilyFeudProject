import * as React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { SurveyAnswer } from '../../../apiclient/models/survey/SurveyAnswer';
import { SurveyQuestion } from '../../../apiclient/models/survey/SurveyQuestion';
import { Player } from '../../../apiclient/models/Player';
import { SurveyTableQuestionCell } from './SurveyTableQuestionCell';

interface SurveyTableBodyRowProps {
    surveyAnswer: SurveyAnswer;
    questionList: SurveyQuestion[];
    playerList: { [playerId: number]: Player };
}

export const SurveyTableBodyRow = (props: SurveyTableBodyRowProps): JSX.Element => {
    return <TableRow>
        <TableCell>
            {(props.playerList && props.playerList[props.surveyAnswer.created_by]?.name) || props.surveyAnswer.created_by}
        </TableCell>
        {
            props.questionList?.map(
                (question, index) => <SurveyTableQuestionCell
                    key={question.id || index}
                    value={props.surveyAnswer?.answers[question.id]?.answer}
                    questionType={question.qtype}
                    playerList={props.playerList}
                />
            )
        }
    </TableRow>
}