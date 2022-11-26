import * as React from 'react'
import { AnswerObject } from '../../../apiclient/models/createrequests/AnswerObject';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'
import { AnswerInputNumber } from './AnswerInputNumber';
import { AnswerInputText } from './AnswerInputText';

interface AnswerInputFamilyFeudProps {
    index: number;
    answer: AnswerObject;

}

export const AnswerInputFamilyFeud = (props: AnswerInputFamilyFeudProps): JSX.Element => {
    return <>
        <AutoScaleMaterialRow>
            <AnswerInputNumber
                title='People answered'
                setNumber={function (value: number): void {
                    props.answer.people_answered = value;
                }}
                initialValue={props.answer.people_answered}
            />
        </AutoScaleMaterialRow>
        <AutoScaleMaterialRow>
            <AnswerInputNumber
                title='Points worth'
                setNumber={(value: number): void => {
                    props.answer.points_value = value;
                }}
                initialValue={props.answer.points_value}
            />
        </AutoScaleMaterialRow>
        <AutoScaleMaterialRow>
            <AnswerInputText
                title={`Answer ${props.index + 1}`}
                answer={props.answer}
            />
        </AutoScaleMaterialRow>
    </>
}