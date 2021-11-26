import * as React from 'react'
import { getBackgroundCssClassForTeam } from '../../../enums/TeamColorsCss';
import { AllLanguageOutput } from '../../common/AllLanguageOutput';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { QuestionProps } from "../common/QuestionProps";

export function NumberEnterQuestionHost(props: QuestionProps): JSX.Element {
    let firstAnswer: number = null;
    let secondAnswer: number = null;
    if (props.question?.real_answers?.length > 0) {
        firstAnswer = props.question.real_answers.find((answer) => answer.team == 1)?.value;
        secondAnswer = props.question.real_answers.find((answer) => answer.team == 2)?.value;
    }
    let realAnswer: number = null;
    if (props.question?.question_data?.answers?.length > 0) {
        realAnswer = props.question.question_data.answers[0]?.correct_value;
    }
    return (
        <AutoScaleMaterialRow>
            <AutoScaleMaterialColumn xs={8} sm={4}>
                <AutoScaleMaterialRow>
                    <AutoScaleMaterialColumn className={getBackgroundCssClassForTeam(1)}>
                        {firstAnswer ? <AllLanguageOutput text={[firstAnswer.toString()]} /> : "?"}
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn>
                        {realAnswer ? <AllLanguageOutput text={[realAnswer.toString()]} /> : "?"}
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn className={getBackgroundCssClassForTeam(2)}>
                        {secondAnswer ? <AllLanguageOutput text={[secondAnswer.toString()]} /> : "?"}
                    </AutoScaleMaterialColumn>
                </AutoScaleMaterialRow>
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>
    )
}