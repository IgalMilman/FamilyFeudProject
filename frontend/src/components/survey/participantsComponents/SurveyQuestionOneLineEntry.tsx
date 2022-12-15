import { TextField } from '@mui/material';
import * as React from 'react';
import { SurveyQuestionParameters } from '../../../apiclient/models/survey/SurveyQuestion';

interface SurveyQuestionOneLineEntryProps {
    label: string;
    id: string;
    questionParameters: SurveyQuestionParameters;
    answer: string;
    setAnswer: (value: string) => void;
}

export const SurveyQuestionOneLineEntry = (props: SurveyQuestionOneLineEntryProps): JSX.Element => {
    const [answer, setAnswer] = React.useState<string>(props.answer ?? "");
    const onChange = (event: { target: { value: string; }; }) => {
        setAnswer(event.target.value);
        props.setAnswer(event.target.value);
    }
    return <TextField
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