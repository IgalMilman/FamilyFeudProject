import * as React from 'react';
import { ApiClient } from '../../../apiclient/ApiClient';
import { Answer } from '../../../apiclient/models/Answer';
import { GiveAnswer } from '../../../apiclient/models/GiveAnswer';
import SubmitButtonType from '../../../enums/SubmitButtonType';
import { AllLanguageOutput } from '../../common/AllLanguageOutput';
import { SubmitButton } from '../../common/QuestionSubmitButton';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';

interface FamilyFeudAnswerProps {
    questionid: string;
    answer: Answer;
}

export function FamilyFeudAnswerHost(props: FamilyFeudAnswerProps): JSX.Element {
    const giveToTeam = function (teamnumber: 1 | 2): void {
        const answer: GiveAnswer = new GiveAnswer();
        answer.answerid = props.answer?.answerdata?.id;
        answer.teamnumber = teamnumber;
        answer.reveal = true;
        ApiClient.getClient(undefined).submitAnswer(props.questionid, answer).then(
            (value: Answer) => {
            }
        )
    }
    return (
        <AutoScaleMaterialRow>
            <AutoScaleMaterialColumn>
                <SubmitButton type={SubmitButtonType.SubmitAnswer} text="Give to left team" disabled={false} onClick={() => giveToTeam(1)} />
            </AutoScaleMaterialColumn>
            {
                <AutoScaleMaterialColumn>
                    <SubmitButton type={SubmitButtonType.SubmitAnswer} text="Reveal answer" disabled={false} onClick={() => {

                        ApiClient.getClient(undefined).revealAnswer(props.answer?.id).then(
                            (value: Answer) => {
                            }
                        )
                    }} />
                    <AllLanguageOutput text={props.answer?.answerdata?.text} />
                    | {props.answer?.answerdata?.points_value} | {props.answer?.answerdata?.points_value})
                </AutoScaleMaterialColumn>
            }
            <AutoScaleMaterialColumn>
                <SubmitButton type={SubmitButtonType.SubmitAnswer} text="Give to second team" disabled={false} onClick={() => giveToTeam(2)} />
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>
    )
}