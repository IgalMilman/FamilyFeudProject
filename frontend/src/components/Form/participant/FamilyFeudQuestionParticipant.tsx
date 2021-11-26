import * as React from 'react'
import { FamilyFeudQuestion } from '../common/FamilyFeudQuestion';
import { QuestionProps } from '../common/QuestionProps';

export function FamilyFeudQuestionParticipant(props: QuestionProps): JSX.Element {
    return (
        <FamilyFeudQuestion {...props}/>
    )
}