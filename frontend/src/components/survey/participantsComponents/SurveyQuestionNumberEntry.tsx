import { TextField } from '@mui/material';
import * as React from 'react';
import { SurveyQuestionParameters } from '../../../apiclient/models/survey/SurveyQuestion';

interface SurveyQuestionNumberEntryProps {
    label: string;
    id: string;
    questionParameters: SurveyQuestionParameters;
    answer: number;
    setAnswer: (event: { target: { value: string; }; }) => void;
}

export const SurveyQuestionNumberEntry = (props: SurveyQuestionNumberEntryProps): JSX.Element => {
    return <TextField
        autoComplete='off'
        type="number"
        label={props.label}
        id={props.id}
        name={props.id}
        onChange={props.setAnswer}
        InputProps={{ inputProps: { min: props.questionParameters?.min, max: props.questionParameters?.max } }}
        value={props.answer ? props.answer : 0}
    />
}