import * as React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { SurveySummary } from '../../apiclient/models/survey/SurveySummary'
import { AllLanguageOutput } from '../common/AllLanguageOutput';
import { SubmitButton } from '../common/QuestionSubmitButton';
import SubmitButtonType from '../../enums/SubmitButtonType';

interface GameSurveyTableRowProps {
    surveySummmary: SurveySummary;
    selectSurvey: (surveyId: string) => void;
    reviewSurvey: (surveyId: string) => void;
}

export const GameSurveyTableRow = (props: GameSurveyTableRowProps): JSX.Element => {
    return <TableRow>
        <TableCell>
            <AllLanguageOutput text={props.surveySummmary.title} />
        </TableCell>
        <TableCell>
            <SubmitButton
                text='Activate'
                onClick={() => props.selectSurvey(props.surveySummmary.id)}
                type={SubmitButtonType.SubmitAnswer}
                disabled={false}
            />
            <SubmitButton
                text='View'
                onClick={() => props.reviewSurvey(props.surveySummmary.id)}
                type={SubmitButtonType.SubmitAnswer}
                disabled={false}
            />
        </TableCell>
    </TableRow>
}