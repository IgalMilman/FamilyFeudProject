import * as React from 'react';
import { SurveyQuestionParameters } from '../../../apiclient/models/survey/SurveyQuestion';
import { SurveyQuestionNumberEntry } from './SurveyQuestionNumberEntry';

interface SurveyQuestionNumberChoiceProps {
    label: string;
    id: string;
    questionParameters: SurveyQuestionParameters;
    answer: number;
    setAnswer: (event: { target: { value: string; }; }) => void;
}

export const SurveyQuestionNumberChoice = (props: SurveyQuestionNumberChoiceProps): JSX.Element => {
    return <SurveyQuestionNumberEntry {...props} />
}