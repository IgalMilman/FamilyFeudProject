import { Rating } from '@mui/material';
import * as React from 'react';
import { SurveyQuestionParameters } from '../../../apiclient/models/survey/SurveyQuestion';

interface SurveyQuestionNumberChoiceProps {
    label: string;
    id: string;
    questionParameters: SurveyQuestionParameters;
    answer: number;
    setAnswer: (value: number) => void;
}

export const SurveyQuestionNumberChoice = (props: SurveyQuestionNumberChoiceProps): JSX.Element => {
    const [answer, setAnswer] = React.useState<number | null>(props.answer);
    const onChange = (event: React.SyntheticEvent, value: number | null) => {
        setAnswer(value);
        props.setAnswer(value);
    }
    return <Rating
        id={props.id}
        name={props.id}
        max={props.questionParameters?.max ?? 5}
        value={answer}
        onChange={onChange}
    />
}