import * as React from 'react'
import { getBackgroundCssClassForTeam } from '../../../enums/TeamColorsCss';
import { AllLanguageOutput } from '../../common/AllLanguageOutput';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { QuestionProps } from "../common/QuestionProps";

export function NumberEnterQuestionShow(props: QuestionProps): JSX.Element {
    let firstAnswer: number = null;
    let realAnswer: number = null;
    let secondAnswer: number = null;
    let showAnswer: boolean = false;
    if (props.question?.real_answers?.length > 0
        && props.question?.question_data?.answers?.length > 0) {
        firstAnswer = props.question.real_answers.find((answer) => answer.team == 1)?.value;
        secondAnswer = props.question.real_answers.find((answer) => answer.team == 2)?.value;
        realAnswer = props.question.question_data.answers[0]?.correct_value;
        showAnswer = props.question.is_complete && (typeof firstAnswer !== 'undefined' && firstAnswer !== null) &&
            (typeof secondAnswer !== 'undefined' && secondAnswer !== null) &&
            (typeof realAnswer !== 'undefined' && realAnswer !== null);
    }
    return (
        <AutoScaleMaterialRow>
            <AutoScaleMaterialColumn xs={8} sm={4}>
                <AutoScaleMaterialRow>
                    <AutoScaleMaterialColumn className={firstAnswer && getBackgroundCssClassForTeam(1)}>
                        {showAnswer ? <AllLanguageOutput text={[firstAnswer?.toString()]} /> : "?"}
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn>
                        <AutoScaleMaterialRow>
                            {showAnswer ? <AllLanguageOutput text={[realAnswer.toString()]} /> : "?"}
                        </AutoScaleMaterialRow>
                        {
                            showAnswer &&
                            <AutoScaleMaterialRow>
                                <AutoScaleMaterialColumn className={getBackgroundCssClassForTeam(1)}>
                                    <AllLanguageOutput text={[Math.abs(realAnswer - firstAnswer).toString()]} />
                                </AutoScaleMaterialColumn>
                                <AutoScaleMaterialColumn className={getBackgroundCssClassForTeam(2)}>
                                    <AllLanguageOutput text={[Math.abs(realAnswer - secondAnswer).toString()]} />
                                </AutoScaleMaterialColumn>
                            </AutoScaleMaterialRow>
                        }
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn className={secondAnswer && getBackgroundCssClassForTeam(2)}>
                        {showAnswer ? <AllLanguageOutput text={[secondAnswer?.toString()]} /> : "?"}
                    </AutoScaleMaterialColumn>
                </AutoScaleMaterialRow>
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>
    )
}