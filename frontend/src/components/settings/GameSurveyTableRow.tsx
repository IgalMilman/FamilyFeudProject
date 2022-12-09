import * as React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { SurveySummary } from '../../apiclient/models/survey/SurveySummary'
import { AllLanguageOutput } from '../common/AllLanguageOutput';
import { SubmitButton } from '../common/QuestionSubmitButton';
import SubmitButtonType from '../../enums/SubmitButtonType';

interface GameSurveyTableRowProps {
    surveySummmary: SurveySummary;
    surveyAction: (surveyId: string) => void;
}

export const GameSurveyTableRow = (props: GameSurveyTableRowProps): JSX.Element => {
    return  <TableRow>
                <TableCell><AllLanguageOutput text={props.surveySummmary.title} /></TableCell>
                <TableCell><SubmitButton
                    text='Activate'
                    onClick={() => props.surveyAction(props.surveySummmary.id)}
                    type={SubmitButtonType.SubmitAnswer}
                    disabled={false}
                /></TableCell>
            </TableRow>
}