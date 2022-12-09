import { Select, MenuItem, TextField } from '@mui/material';
import * as React from 'react'
import { SurveyObject } from '../../../apiclient/models/createrequests/SurveyObject';
import { Survey } from '../../../apiclient/models/survey/Survey';

const DEFAULT_NUMBER_OF_LANGUAGES = 1;
// const DEFAULT_LANGUAGE_TYPE = QuestionType.FamilyFeud;

/*const createQuestionObjects = (numberOfLanguages: number, questionType: QuestionType, numberOfAnswers: number = 1): QuestionObject => {
    const question = new QuestionObject();
    question.qtype = questionType;
    question.scaleLanguageCount(numberOfLanguages);
    question.scaleAnswerCount(numberOfAnswers);
    return question;
}*/

interface UpsertSurveyFormProps {
    survey: SurveyObject;
    updateData: (value: Survey) => void;
    backToTable: () => void;
}

export const UpsertSurveyForm = (props: UpsertSurveyFormProps): JSX.Element => {
    return <></>
}
