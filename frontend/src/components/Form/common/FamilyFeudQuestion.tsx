import * as React from 'react'
import { QuestionProps } from './QuestionProps'
import { FamilyFeudAnswer } from './FamilyFeudAnswer'
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn'

export function FamilyFeudQuestion(props: QuestionProps): JSX.Element {
    return (
        <AutoScaleMaterialColumn spacing={2}>
            {props.question?.real_answers?.map((answer, index) => <FamilyFeudAnswer key={index} answer={answer} />)}
        </AutoScaleMaterialColumn>
        )
}