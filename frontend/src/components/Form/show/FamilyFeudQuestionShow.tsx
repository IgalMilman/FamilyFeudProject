import * as React from 'react'
import { FamilyFeudQuestion } from '../common/FamilyFeudQuestion';
import { QuestionProps } from '../common/QuestionProps';

export function FamilyFeudQuestionShow(props: QuestionProps): JSX.Element {
    return (
        <FamilyFeudQuestion {...props}/>
    )
}