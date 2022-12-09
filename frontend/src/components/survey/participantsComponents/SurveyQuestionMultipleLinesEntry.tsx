import { TextField } from '@mui/material';
import * as React from 'react';
import { SurveyQuestionParameters } from '../../../apiclient/models/survey/SurveyQuestion';

interface SurveyQuestionMultipleLinesEntryProps {
    label: string;
    id: string;
    questionParameters: SurveyQuestionParameters;
    answer: string;
    setAnswer: (event: { target: { value: string; }; }) => void;
}

export const SurveyQuestionMultipleLinesEntry = (props: SurveyQuestionMultipleLinesEntryProps): JSX.Element => {
    return <TextField
        multiline
        label={props.label}
        id={props.id}
        name={props.id}
        autoComplete='off'
        type='text'
        value={props.answer}
        onChange={props.setAnswer}
    />
}