import * as React from 'react'
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { QuestionProps } from '../common/QuestionProps';
import { FamilyFeudAnswerHost } from './FamilyFeudAnswerHost';

export function FamilyFeudQuestionHost(props: QuestionProps): JSX.Element {
    return (
        <AutoScaleMaterialColumn>
            {props.question?.real_answers?.map((answer, index) => <FamilyFeudAnswerHost key={index} questionid={props.question?.id} answer={answer} />)}
        </AutoScaleMaterialColumn>
    )
}