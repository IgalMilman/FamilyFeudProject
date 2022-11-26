import { Select, MenuItem, TextField } from '@mui/material';
import * as React from 'react'
import { ApiClient } from '../../../apiclient/ApiClient';
import { APIResponse } from '../../../apiclient/models/APIResponse';
import { QuestionObject } from '../../../apiclient/models/createrequests/QuetionObject';
import { QuestionData } from '../../../apiclient/models/QuestionData';
import { QuestionType, QuestionTypeFromNumber } from '../../../enums/QuestionType';
import SubmitButtonType from '../../../enums/SubmitButtonType';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn'
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'
import { MessageArea, MessageAreaProps } from '../../common/MessageArea';
import { SubmitButton } from '../../common/QuestionSubmitButton';
import { AnswerPart } from './AnswerPart';
import { QuestionTextInput } from './QuestionTextInput';

const DEFAULT_NUMBER_OF_LANGUAGES = 1;
const DEFAULT_LANGUAGE_TYPE = QuestionType.FamilyFeud;

const createQuestionObjects = (numberOfLanguages: number, questionType: QuestionType, numberOfAnswers: number = 1): QuestionObject => {
    const question = new QuestionObject();
    question.qtype = questionType;
    question.scaleLanguageCount(numberOfLanguages);
    question.scaleAnswerCount(numberOfAnswers);
    return question;
}

export const CreateQuestionForm = (): JSX.Element => {
    const [numberOfLanguages, changeNumberOfLanguages] = React.useState<number>(DEFAULT_NUMBER_OF_LANGUAGES);
    const [questionType, changeQuestionType] = React.useState<QuestionType>(DEFAULT_LANGUAGE_TYPE);
    const [message, changeMessage] = React.useState<MessageAreaProps>(null);
    const [question, changeQuestion] = React.useState<QuestionObject>(createQuestionObjects(DEFAULT_NUMBER_OF_LANGUAGES, DEFAULT_LANGUAGE_TYPE));
    const onQuestionTypeChange = (event: { target: { value: string } }): void => {
        const t: QuestionType = QuestionTypeFromNumber(parseInt(event.target.value));
        question.changeQuestionType(t);
        changeQuestionType(t);
    }
    const onChangeNumberOfLanguages = (value: number): void => {
        question.scaleLanguageCount(value);
        changeNumberOfLanguages(value);
    }
    return <AutoScaleMaterialRow>
        <AutoScaleMaterialColumn spacing={1}>
            <MessageArea {...message} />
            <AutoScaleMaterialRow>
                <Select
                    value={questionType.toString()}
                    name='questiontype'
                    id='questiontype'
                    onChange={onQuestionTypeChange}>
                    <MenuItem value={QuestionType.FamilyFeud}>Family feud</MenuItem>
                    <MenuItem value={QuestionType.FirstButton}>First button</MenuItem>
                    <MenuItem value={QuestionType.NumberEnter}>Number enter</MenuItem>
                </Select>
            </AutoScaleMaterialRow>
            <AutoScaleMaterialRow>
                <TextField
                    type='number'
                    label='Number of languages'
                    value={numberOfLanguages}
                    onChange={(event: { target: { value: string } }) => {
                        onChangeNumberOfLanguages(parseInt(event.target.value));
                    }}
                    autoComplete='off'
                />
            </AutoScaleMaterialRow>
            <QuestionTextInput question={question} />
            <AnswerPart
                question={question}
            />
            <SubmitButton type={SubmitButtonType.SubmitAnswer} disabled={false} onClick={function (): void {
                question.qtype = questionType;
                ApiClient.getClient().upsertQuestion(question).then((value: APIResponse<QuestionData>) => {
                    if (!value) {
                        changeMessage({ type: 'error', text: 'There was error with the request' });
                        return;
                    }
                    if (value.status == 200) {
                        changeMessage({ type: 'success', text: 'Question was created successfully.' });
                        setTimeout(() => { changeMessage(undefined) }, 10000);
                        changeQuestion(createQuestionObjects(numberOfLanguages, questionType, question.answers.length));
                    }
                    else {
                        changeMessage({ type: 'error', text: value.error });
                    }
                })
            }} />
        </AutoScaleMaterialColumn>
    </AutoScaleMaterialRow>
}