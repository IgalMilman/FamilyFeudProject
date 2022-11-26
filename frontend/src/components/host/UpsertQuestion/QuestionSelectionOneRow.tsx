import { TableCell, TableRow } from '@mui/material';
import * as React from 'react'
import { QuestionSummary } from '../../../apiclient/models/QuestionSummary';
import { QuestionTextFromNumber } from '../../../enums/QuestionType';
import SubmitButtonType from '../../../enums/SubmitButtonType';
import { AllLanguageOutput } from '../../common/AllLanguageOutput';
import { SubmitButton } from '../../common/QuestionSubmitButton';

interface QuestionSelectionOneRowProps {
    question: QuestionSummary;
    editQuestion: (question: QuestionSummary) => void;
}

export function QuestionSelectionOneRow(props: QuestionSelectionOneRowProps): JSX.Element {
    return (
        <TableRow>
            <TableCell align="right"><AllLanguageOutput text={props.question?.text} /></TableCell>
            <TableCell align="center">{QuestionTextFromNumber(props.question?.qtype)}</TableCell>
            <TableCell align="center">
                <SubmitButton
                    type={SubmitButtonType.SubmitAnswer}
                    text='Edit'
                    disabled={false}
                    onClick={() => props.editQuestion(props.question)} />
            </TableCell>
        </TableRow>
    )
}
