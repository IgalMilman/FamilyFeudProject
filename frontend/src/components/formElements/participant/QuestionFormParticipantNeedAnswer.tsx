import * as React from 'react'
import { QuestionType, QuestionTypeFromNumber } from '../../../enums/QuestionType'
import { QuestionDisplay } from '../common/QuestionDisplay';
import { FamilyFeudQuestionParticipant } from './FamilyFeudQuestionParticipant';
import { NumberEnterQuestionParticipant } from './NumberEnterQuestionParticipant';
import { ButtonQuestionParticipant } from './ButtonQuestionParticipant';
import { OpenQuestionParticipant } from './OpenQuestionParticipant';
import { SubmitButton } from '../../common/QuestionSubmitButton';
import SubmitButtonType from '../../../enums/SubmitButtonType';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { ApiClient } from '../../../apiclient/ApiClient';
import { GiveAnswer } from '../../../apiclient/models/GiveAnswer';
import { QuestionPropsParticipant } from './QuestionPropsParticipant';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';

export function QuestionFormParticipantNeedAnswer(props: QuestionPropsParticipant): JSX.Element {
    const questionType: QuestionType = QuestionTypeFromNumber(props.question?.question_data?.qtype)
    const [value, changeValue] = React.useState<string>("0");
    const [textValue, changeTextValue] = React.useState<string>("");
    const onChange = (newValue: string) => {
        changeValue(newValue);
    }
    let formItem: JSX.Element = null;
    let needButton = false;
    switch (questionType) {
        case (QuestionType.NumberEnter): {
            formItem = (<NumberEnterQuestionParticipant
                callBack={onChange}
                question={props.question}
                value={value} />);
            needButton = true;
            break;
        }
        case (QuestionType.OpenQuestion): {
            formItem = (<OpenQuestionParticipant
                callBack={changeTextValue}
                question={props.question}
                value={textValue} />);
            needButton = true;
            break;
        }
        case (QuestionType.FamilyFeud): {
            formItem = (<FamilyFeudQuestionParticipant {...props} />);
            break;
        }
        case (QuestionType.FirstButton): {
            formItem = (<ButtonQuestionParticipant {...props} />)
            needButton = true;
            break;
        }
    }
    return (
        <AutoScaleMaterialColumn>
            <QuestionDisplay
                question={props.question}
            />
            <AutoScaleMaterialRow>
                {formItem}
                {needButton && <SubmitButton type={SubmitButtonType.SubmitAnswer} disabled={!value} onClick={() => {
                    let answer: GiveAnswer = new GiveAnswer();
                    answer.value = Number.parseInt(value);
                    answer.textanswer = textValue;
                    answer.teamnumber = props.teamNumber;
                    ApiClient.getClient().submitAnswer(props.question?.id, answer)
                }} />}
            </AutoScaleMaterialRow>
        </AutoScaleMaterialColumn>
    )
}