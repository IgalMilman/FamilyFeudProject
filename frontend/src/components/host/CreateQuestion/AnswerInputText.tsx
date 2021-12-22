import * as React from 'react'
import { MultiTextCreationObject } from '../../../apiclient/models/createrequests/MultiTextCreationObject';
import { MultiTextInput } from './MultiTextInput';

interface AnswerInputTextProps {
    numberOfLanguages: number;
    title?: string;
    setText: (createdObjects: MultiTextCreationObject[]) => void;
}

export const AnswerInputText = (props: AnswerInputTextProps): JSX.Element => {
    return <MultiTextInput numberOfLanguages={props.numberOfLanguages} setObject={props.setText} title={props.title} />
}