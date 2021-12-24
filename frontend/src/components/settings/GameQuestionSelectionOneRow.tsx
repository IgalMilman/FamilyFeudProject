import { TableCell, TableRow } from '@mui/material';
import * as React from 'react'
import { QuestionData } from '../../apiclient/models/QuestionData';
import { QuestionTextFromNumber } from '../../enums/QuestionType';
import SubmitButtonType from '../../enums/SubmitButtonType';
import { AllLanguageOutput } from '../common/AllLanguageOutput';
import { SubmitButton } from '../common/QuestionSubmitButton';

interface GameQuestionSelectionOneRowProps {
    question: QuestionData;
    questionSelectionAction: (question: QuestionData) => void;
}

export function GameQuestionSelectionOneRow(props: GameQuestionSelectionOneRowProps): JSX.Element {
    const questionState: string = props.question?.is_complete ? 'Completed'
        : (props.question?.has_real ? 'Started' : 'Not started');
    return (
        <TableRow>
            <TableCell align="right"><AllLanguageOutput text={props.question?.text} /></TableCell>
            <TableCell align="center">{QuestionTextFromNumber(props.question?.qtype)}</TableCell>
            <TableCell align="center">{questionState}</TableCell>
            <TableCell align="center">
                  <SubmitButton
                type={SubmitButtonType.SubmitAnswer}
                text='Select question'
                disabled={false}
                onClick={() => props.questionSelectionAction(props.question)} />
                </TableCell>
        </TableRow>
    )
}
