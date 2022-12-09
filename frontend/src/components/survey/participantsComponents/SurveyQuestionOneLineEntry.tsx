import { TextField } from '@mui/material';
import * as React from 'react';
import { SurveyQuestionParameters } from '../../../apiclient/models/survey/SurveyQuestion';

interface SurveyQuestionOneLineEntryProps {
    label: string;
    id: string;
    questionParameters: SurveyQuestionParameters;
    answer: string;
    setAnswer: (event: { target: { value: string; }; }) => void;
}

export const SurveyQuestionOneLineEntry = (props: SurveyQuestionOneLineEntryProps): JSX.Element => {
    return <TextField
        label={props.label}
        id={props.id}
        name={props.id}
        autoComplete='off'
        type='text'
        value={props.answer}
        onChange={props.setAnswer}
    />
}