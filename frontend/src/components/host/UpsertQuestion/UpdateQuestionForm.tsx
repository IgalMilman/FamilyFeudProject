import { TextField } from '@mui/material';
import * as React from 'react'
import { ApiClient } from '../../../apiclient/ApiClient';
import { APIResponse } from '../../../apiclient/models/APIResponse';
import { QuestionObject } from '../../../apiclient/models/createrequests/QuetionObject';
import { QuestionData } from '../../../apiclient/models/QuestionData';
import { QuestionTextFromNumber } from '../../../enums/QuestionType';
import SubmitButtonType from '../../../enums/SubmitButtonType';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn'
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'
import { MessageArea, MessageAreaProps } from '../../common/MessageArea';
import { SubmitButton } from '../../common/QuestionSubmitButton';
import StyledButton from '../../styled/Button';
import { AnswerPart } from './AnswerPart';
import { QuestionTextInput } from './QuestionTextInput';

interface UpdateQuestionFormProps {
    question: QuestionObject;
    updateData: (question: QuestionData) => void;
    backToTable: () => void;
}

export const UpdateQuestionForm = (props: UpdateQuestionFormProps): JSX.Element => {
    const [numberOfLanguages, changeNumberOfLanguages] = React.useState<number>(props.question?.text?.length ?? 1);
    const [message, changeMessage] = React.useState<MessageAreaProps>(null);
    const onChangeNumberOfLanguages = (value: number): void => {
        props.question.scaleLanguageCount(value);
        changeNumberOfLanguages(value);
    }
    return <AutoScaleMaterialRow>
        <AutoScaleMaterialColumn spacing={1}>
            <MessageArea {...message} />
            <AutoScaleMaterialRow>
                {QuestionTextFromNumber(props.question.qtype)}
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
            <QuestionTextInput question={props.question} />
            <AnswerPart
                question={props.question}
            />
            <SubmitButton type={SubmitButtonType.SubmitAnswer} disabled={false} onClick={function (): void {
                ApiClient.getClient().upsertQuestion(props.question).then((value: APIResponse<QuestionData>) => {
                    if (!value) {
                        changeMessage({ type: 'error', text: 'There was error with the request' });
                        return;
                    }
                    if (value.status == 200) {
                        changeMessage({ type: 'success', text: 'Question was updated successfully.' });
                        props.updateData(value.data);
                        setTimeout(() => { changeMessage(undefined) }, 10000);
                    }
                    else {
                        changeMessage({ type: 'error', text: value.error });
                    }
                })
            }} />
            <StyledButton onClick={props.backToTable} type="button">
                Back
            </StyledButton>
        </AutoScaleMaterialColumn>
    </AutoScaleMaterialRow>
}