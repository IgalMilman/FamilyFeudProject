import * as React from 'react'
import { AnswerObject } from '../../../apiclient/models/createrequests/AnswerObject';
import { MultiTextCreationObject } from '../../../apiclient/models/createrequests/MultiTextCreationObject';
import { QuestionType } from '../../../enums/QuestionType';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'
import { AnswerInputNumber } from './AnswerInputNumber';
import { AnswerInputText } from './AnswerInputText';

interface OneAnswerInputElementProps {
    answer: AnswerObject;
    questionType: QuestionType;
}

export const OneAnswerInputElement = (props: OneAnswerInputElementProps): JSX.Element => {
    const input: JSX.Element = props.questionType == QuestionType.FirstButton ?
        <AnswerInputText
            title='Enter answer'
            answer={props.answer}
        />
        : <AnswerInputNumber title='Enter answer' setNumber={(value: number): void => {
            props.answer.correct_value = value;
        }} />
    return <>
        <AutoScaleMaterialRow>
            <AnswerInputNumber
                title='Points worth'
                setNumber={(value: number): void => {
                    props.answer.points_value = value;
                }} />
        </AutoScaleMaterialRow>
        <AutoScaleMaterialRow>
            {input}
        </AutoScaleMaterialRow></>
}