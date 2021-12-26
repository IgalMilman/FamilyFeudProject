import * as React from 'react'
import { QuestionObject } from '../../../apiclient/models/createrequests/QuetionObject';
import { QuestionType } from '../../../enums/QuestionType';
import { FamilyFeudAnswerElement } from './FamilyFeudAnswerElement';
import { OneAnswerInputElement } from './OneAnswerInputElement';

interface AnswerPartProps {
    question: QuestionObject;
}

export const AnswerPart = (props: AnswerPartProps): JSX.Element => {
    let input:JSX.Element = undefined;
    switch (props.question.qtype) {
        case QuestionType.FamilyFeud:
            input = <FamilyFeudAnswerElement question={props.question}/>
            break;
        default:
            input = <OneAnswerInputElement answer={props.question.answers[0]} questionType={props.question.qtype} />
    }
    return input;
}