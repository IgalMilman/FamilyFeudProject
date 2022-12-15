import { TextField } from '@mui/material';
import * as React from 'react';
import { SurveyQuestionParameters } from '../../../apiclient/models/survey/SurveyQuestion';

interface SurveyQuestionNumberEntryProps {
    label: string;
    id: string;
    questionParameters: SurveyQuestionParameters;
    answer: number;
    setAnswer: (value: number) => void;
}

export const SurveyQuestionNumberEntry = (props: SurveyQuestionNumberEntryProps): JSX.Element => {
    const [answer, setAnswer] = React.useState<number>(props.answer ?? 0);
    const onChange = (event: { target: { value: string; }; }) => {
        const value = parseInt(event.target.value ?? "0")
        setAnswer(value);
        props.setAnswer(value);
    }
    return <TextField
        autoComplete='off'
        type="number"
        label={props.label}
        id={props.id}
        name={props.id}
        onChange={onChange}
        fullWidth
        InputProps={{ inputProps: { min: props.questionParameters?.min, max: props.questionParameters?.max } }}
        value={answer}
    />
}