import { TextField } from '@mui/material';
import * as React from 'react';
import { SurveyQuestionParameters } from '../../../apiclient/models/survey/SurveyQuestion';

interface SurveyQuestionMultipleLinesEntryProps {
    label: string;
    id: string;
    questionParameters: SurveyQuestionParameters;
    answer: string;
    setAnswer: (value: string) => void;
}

export const SurveyQuestionMultipleLinesEntry = (props: SurveyQuestionMultipleLinesEntryProps): JSX.Element => {
    const [answer, setAnswer] = React.useState<string>(props.answer ?? "");
    const onChange = (event: { target: { value: string; }; }) => {
        setAnswer(event.target.value);
        props.setAnswer(event.target.value);
    }
    return <TextField
        multiline
        label={props.label}
        id={props.id}
        name={props.id}
        autoComplete='off'
        type='text'
        value={answer}
        fullWidth
        onChange={onChange}
    />
}