import * as React from 'react'
import { AnswerObject } from '../../../apiclient/models/createrequests/AnswerObject';
import { QuestionType } from '../../../enums/QuestionType';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { FamilyFeudAnswerElement } from './FamilyFeudAnswerElement';
import { OneAnswerInputElement } from './OneAnswerInputElement';

interface AnswerPartProps {
    numberOfLanguages: number;
    questionType: QuestionType;
    setAnswers: (answers: AnswerObject[]) => void;
}

export const AnswerPart = (props: AnswerPartProps): JSX.Element => {
    let input:JSX.Element = undefined;
    switch (props.questionType) {
        case QuestionType.FamilyFeud:
            input = <FamilyFeudAnswerElement
                numberOfLanguages={props.numberOfLanguages}
                setAnswers={props.setAnswers} />
            break;
        default:
            input = <OneAnswerInputElement 
            numberOfLanguages={props.numberOfLanguages} 
            questionType={props.questionType}
            setAnswers={props.setAnswers} />
    }
    return input;
}