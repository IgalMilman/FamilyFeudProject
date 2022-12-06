import * as React from 'react';
import { ApiClient } from '../../../apiclient/ApiClient';
import { RealAnswer } from '../../../apiclient/models/RealAnswer';
import { GiveAnswer } from '../../../apiclient/models/GiveAnswer';
import SubmitButtonType from '../../../enums/SubmitButtonType';
import { AllLanguageOutput } from '../../common/AllLanguageOutput';
import { SubmitButton } from '../../common/QuestionSubmitButton';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { TableRow, TableCell } from '@mui/material';

interface FamilyFeudAnswerProps {
    questionid: string;
    answer: RealAnswer;
}

export function FamilyFeudAnswerHost(props: FamilyFeudAnswerProps): JSX.Element {
    const giveToTeam = function (teamnumber: 1 | 2): void {
        const answer: GiveAnswer = new GiveAnswer();
        answer.answerid = props.answer?.answerdata?.id;
        answer.teamnumber = teamnumber;
        answer.reveal = true;
        ApiClient.getClient().submitAnswer(props.questionid, answer).then(
            (value: RealAnswer) => {
            }
        )
    }
    return (
        <TableRow>
            <TableCell align="center">
                <SubmitButton type={SubmitButtonType.SubmitAnswer} text="Give to left team" disabled={false} onClick={() => giveToTeam(1)} />
            </TableCell>
            <TableCell align="center">
                <AutoScaleMaterialColumn>
                    <SubmitButton type={SubmitButtonType.SubmitAnswer} text="Reveal answer" disabled={false} onClick={() => {
                        ApiClient.getClient().revealAnswer(props.answer?.id).then(
                            (value: RealAnswer) => {
                            }
                        )
                    }} />
                    <AllLanguageOutput text={props.answer?.answerdata?.text} />
                </AutoScaleMaterialColumn>
            </TableCell>
            <TableCell align="center">
                {props.answer?.answerdata?.people_answered}
            </TableCell>
            <TableCell align="center">
                {props.answer?.answerdata?.points_value}
            </TableCell>
            <TableCell align="center">
                <SubmitButton type={SubmitButtonType.SubmitAnswer} text="Give to second team" disabled={false} onClick={() => giveToTeam(2)} />
            </TableCell>
        </TableRow>
    )
}