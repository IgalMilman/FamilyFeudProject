import { Table, TableBody } from '@mui/material';
import * as React from 'react'
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { QuestionProps } from '../common/QuestionProps';
import { FamilyFeudAnswerHost } from './FamilyFeudAnswerHost';

export function FamilyFeudQuestionHost(props: QuestionProps): JSX.Element {
    return (
        <AutoScaleMaterialRow>
            <Table>
                <TableBody>
                    {props.question?.real_answers?.map((answer, index) => <FamilyFeudAnswerHost key={index} questionid={props.question?.id} answer={answer} />)}
                </TableBody>
            </Table>
        </AutoScaleMaterialRow>
    )
}