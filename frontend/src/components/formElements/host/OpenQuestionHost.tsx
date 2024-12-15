import * as React from 'react'
import { RealAnswer } from '../../../apiclient/models/RealAnswer';
import { getBackgroundCssClassForTeam } from '../../../enums/TeamColorsCss';
import { AllLanguageOutput } from '../../common/AllLanguageOutput';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { QuestionProps } from "../common/QuestionProps";
import { SubmitButton } from '../../common/QuestionSubmitButton';
import SubmitButtonType from '../../../enums/SubmitButtonType';
import { ApiClient } from '../../../apiclient/ApiClient';

export function OpenQuestionHost(props: QuestionProps): JSX.Element {
    let firstAnswer: RealAnswer = props.question.real_answers.find((answer) => answer.team == 1);
    let secondAnswer: RealAnswer = props.question.real_answers.find((answer) => answer.team == 2);
    let realAnswer: string[] = undefined;
    if (props.question?.question_data?.answers?.length > 0) {
        realAnswer = props.question.question_data.answers[0]?.text;
    }
    return (
        <AutoScaleMaterialRow>
            <AutoScaleMaterialColumn>
                <AutoScaleMaterialRow>
                    <AutoScaleMaterialColumn className={firstAnswer ? getBackgroundCssClassForTeam(1) : undefined}>
                        <AllLanguageOutput text={props.question.start && firstAnswer?.textanswer ? [firstAnswer.textanswer] : ['-']} />
                        <SubmitButton type={SubmitButtonType.SubmitAnswer} text="Reveal answer" disabled={false} onClick={() => {
                            ApiClient.getClient().revealAnswer(firstAnswer?.id, false).then(
                                (value: RealAnswer) => {
                                }
                            )
                        }} />
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn>
                        {realAnswer ? <AllLanguageOutput text={realAnswer} /> : "?"}
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn className={secondAnswer ? getBackgroundCssClassForTeam(2) : undefined}>
                        <AllLanguageOutput text={props.question.start && secondAnswer?.textanswer ? [secondAnswer.textanswer] : ['-']} />
                        <SubmitButton type={SubmitButtonType.SubmitAnswer} text="Reveal answer" disabled={false} onClick={() => {
                                ApiClient.getClient().revealAnswer(secondAnswer?.id, false).then(
                                    (value: RealAnswer) => {
                                    }
                                )
                            }} />
                    </AutoScaleMaterialColumn>
                </AutoScaleMaterialRow>
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>
    )
}