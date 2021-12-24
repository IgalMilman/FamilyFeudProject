import * as React from 'react'
import { AnswerObject } from '../../../apiclient/models/createrequests/AnswerObject';
import { MultiTextCreationObject } from '../../../apiclient/models/createrequests/MultiTextCreationObject';
import { QuestionType } from '../../../enums/QuestionType';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'
import { AnswerInputNumber } from './AnswerInputNumber';
import { AnswerInputText } from './AnswerInputText';

interface OneAnswerInputElementProps {
    numberOfLanguages: number;
    questionType: QuestionType;
    setAnswers: (answers: AnswerObject[]) => void;
}

export const OneAnswerInputElement = (props: OneAnswerInputElementProps): JSX.Element => {
    const answer: AnswerObject = new AnswerObject();
    props.setAnswers([answer]);
    const input: JSX.Element = props.questionType == QuestionType.FirstButton ?
        <AnswerInputText
            title='Enter answer'
            numberOfLanguages={props.numberOfLanguages}
            setText={(createdObjects: MultiTextCreationObject[]): void => {
                answer.text = createdObjects;
            }} />
        : <AnswerInputNumber title='Enter answer' setNumber={(value: number): void => {
            answer.correct_value = value;
        }} />
    return <>
        <AutoScaleMaterialRow>
            <AnswerInputNumber
                title='Points worth'
                setNumber={(value: number): void => {
                    answer.points_value = value;
                }} />
        </AutoScaleMaterialRow>
        <AutoScaleMaterialRow>
            {input}
        </AutoScaleMaterialRow></>
}