import { Select, MenuItem, TextField } from '@mui/material';
import * as React from 'react'
import { SurveyObject } from '../../../apiclient/models/createrequests/SurveyObject';
import { Survey } from '../../../apiclient/models/survey/Survey';
import SubmitButtonType from '../../../enums/SubmitButtonType';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { MessageArea } from '../../common/MessageArea';
import { SubmitButton } from '../../common/QuestionSubmitButton';
import StyledButton from '../../styled/Button';

const DEFAULT_NUMBER_OF_LANGUAGES = 1;
// const DEFAULT_LANGUAGE_TYPE = QuestionType.FamilyFeud;

/*const createQuestionObjects = (numberOfLanguages: number, questionType: QuestionType, numberOfAnswers: number = 1): QuestionObject => {
    const question = new QuestionObject();
    question.qtype = questionType;
    question.scaleLanguageCount(numberOfLanguages);
    question.scaleAnswerCount(numberOfAnswers);
    return question;
}*/


// interface UpdateQuestionFormProps {
//     question: QuestionObject;
//     updateData: (question: QuestionData) => void;
//     backToTable: () => void;
// }

// export const UpdateQuestionForm = (props: UpdateQuestionFormProps): JSX.Element => {

interface UpsertSurveyFormProps {
    surveyId: string;
    backToTable: () => void;
}

/*export const UpsertSurveyScreen = (props: UpsertSurveyFormProps): JSX.Element => {
    const [numberOfLanguages, changeNumberOfLanguages] = React.useState<number>(props.question?.text?.length ?? 1);
    const [message, changeMessage] = React.useState<MessageAreaProps>(null);
    /*const onChangeNumberOfLanguages = (value: number): void => {
        props.question.scaleLanguageCount(value);
        changeNumberOfLanguages(value);
    }
    return <AutoScaleMaterialRow>
        <AutoScaleMaterialColumn spacing={1}>
            <MessageArea {...message} />
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
            <AutoScaleMaterialRow>
                <SubmitButton disabled={false} type={SubmitButtonType.SubmitAnswer} text="Upsert survey" onClick={()=>{}}/>
            </AutoScaleMaterialRow>
            <AutoScaleMaterialRow>
                <SubmitButton disabled={false} type={SubmitButtonType.SubmitAnswer} text="Back to table" onClick={props.backToTable}/>
            </AutoScaleMaterialRow>
            </AutoScaleMaterialColumn>
            </AutoScaleMaterialRow>
}
*/