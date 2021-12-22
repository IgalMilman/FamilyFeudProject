import { Select, MenuItem, TextField } from '@mui/material';
import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { APIResponse } from '../../apiclient/models/APIResponse';
import { AnswerObject } from '../../apiclient/models/createrequests/AnswerObject';
import { MultiTextCreationObject } from '../../apiclient/models/createrequests/MultiTextCreationObject';
import { QuestionObject } from '../../apiclient/models/createrequests/QuetionObject';
import { QuestionData } from '../../apiclient/models/QuestionData';
import { QuestionType, QuestionTypeFromNumber } from '../../enums/QuestionType';
import SubmitButtonType from '../../enums/SubmitButtonType';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn'
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow'
import { MessageArea, MessageAreaProps } from '../common/MessageArea';
import { SubmitButton } from '../common/QuestionSubmitButton';
import { AnswerInputNumber } from './CreateQuestion/AnswerInputNumber';
import { AnswerPart } from './CreateQuestion/AnswerPart';
import { MultiTextInput } from './CreateQuestion/MultiTextInput';

interface CreateQuestionFormProps {

}

export const CreateQuestionForm = (props: CreateQuestionFormProps): JSX.Element => {
    const [numberOfLanguages, changeNumberOfLanguages] = React.useState<number>(1);
    const [questionType, changeQuestionType] = React.useState<QuestionType>(QuestionType.FamilyFeud);
    const [message, changeMessage] = React.useState<MessageAreaProps>(null);
    const [question, changeQuestion] = React.useState<QuestionObject>(new QuestionObject());
    const onQuestionTypeChange = (event: { target: { value: string } }): void => {
        const t: QuestionType = QuestionTypeFromNumber(parseInt(event.target.value));
        changeQuestionType(t);
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
                <AnswerInputNumber
                    setNumber={changeNumberOfLanguages}
                    initialValue={numberOfLanguages}
                    optional={false}
                    title='Number of languages'
                />
            </AutoScaleMaterialRow>
            <MultiTextInput numberOfLanguages={numberOfLanguages}
                title='Question'
                setObject={(createdObjects: MultiTextCreationObject[]) => {
                    question.text = createdObjects;
                }} />
            <AnswerPart
                numberOfLanguages={numberOfLanguages}
                questionType={questionType}
                setAnswers={(answers: AnswerObject[]): void => {
                    question.answers = answers;
                }} />
            <SubmitButton type={SubmitButtonType.SubmitAnswer} disabled={false} onClick={function (): void {
                question.qtype = questionType;
                ApiClient.getClient().createQuestion(question).then((value: APIResponse<QuestionData>) => {
                    if (!value) {
                        changeMessage({type:'error', text: 'There was error with the request'});
                        return;
                    }
                    if (value.status == 200) {
                        changeMessage({ type: 'success', text: 'Question was created successfully.' });
                        changeQuestion(new QuestionObject());
                    }
                    else {
                        changeMessage({ type: 'error', text: value.error });
                    }
                })
            }} />
        </AutoScaleMaterialColumn>
    </AutoScaleMaterialRow>
}