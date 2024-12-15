import * as React from 'react'
import { AnswerObject } from '../../../apiclient/models/createrequests/AnswerObject';
import { QuestionType } from '../../../enums/QuestionType';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'
import { AnswerInputNumber } from './AnswerInputNumber';
import { AnswerInputText } from './AnswerInputText';

interface OneAnswerInputElementProps {
    answer: AnswerObject;
    questionType: QuestionType;
}

export const OneAnswerInputElement = (props: OneAnswerInputElementProps): JSX.Element => {
    const input: JSX.Element = props.questionType == QuestionType.NumberEnter ?
        <AnswerInputNumber
            title='Enter answer'
            initialValue={props.answer.correct_value}
            setNumber={(value: number): void => {
                props.answer.correct_value = value;
            }} />
        : <AnswerInputText
            title='Enter answer'
            answer={props.answer}
        />;
    return <>
        <AutoScaleMaterialRow>
            <AnswerInputNumber
                title='Points worth'
                initialValue={props.answer.points_value}
                setNumber={(value: number): void => {
                    props.answer.points_value = value;
                }} />
        </AutoScaleMaterialRow>
        <AutoScaleMaterialRow>
            {input}
        </AutoScaleMaterialRow></>
}