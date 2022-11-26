import * as React from 'react'
import { AnswerObject } from '../../../apiclient/models/createrequests/AnswerObject';
import { MultiTextInput } from './MultiTextInput';

interface AnswerInputTextProps {
    answer: AnswerObject;
    title?: string;
}

export const AnswerInputText = (props: AnswerInputTextProps): JSX.Element => {
    return <MultiTextInput title={props.title} items={props.answer.text} />
}