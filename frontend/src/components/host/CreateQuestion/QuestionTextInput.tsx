import * as React from 'react';
import { QuestionObject } from '../../../apiclient/models/createrequests/QuetionObject';
import { MultiTextInput } from './MultiTextInput';

interface QuestionTextInputProps {
    question: QuestionObject;

}

export const QuestionTextInput = (props: QuestionTextInputProps): JSX.Element => {
    return <MultiTextInput
        items={props.question.text}
        title='Question'
    />
}