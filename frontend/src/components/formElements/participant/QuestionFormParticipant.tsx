import * as React from 'react'
import { QuestionType } from '../../../enums/QuestionType'
import { QuestionPropsParticipant } from './QuestionPropsParticipant';
import { QuestionFormParticipantNeedAnswer } from './QuestionFormParticipantNeedAnswer';
import { QuestionFormShow } from '../show/QuestionFormShow';

export function QuestionFormParticipant(props: QuestionPropsParticipant): JSX.Element {
    let showInput = false;
    if (props.question?.question_data && props.question.question_data.qtype != QuestionType.FamilyFeud) {
        showInput = !(props.question?.real_answers?.length > 0) || props.question.real_answers.findIndex((answer) => answer.team == props.teamNumber) == -1;
    }
    return showInput ? <QuestionFormParticipantNeedAnswer {...props} /> : <QuestionFormShow {...props} />;
}