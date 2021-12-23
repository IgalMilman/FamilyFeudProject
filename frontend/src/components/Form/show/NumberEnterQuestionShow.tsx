import * as React from 'react'
import { Answer } from '../../../apiclient/models/Answer';
import { AnswerData } from '../../../apiclient/models/AnswerData';
import { getBackgroundCssClassForTeam } from '../../../enums/TeamColorsCss';
import { AllLanguageOutput } from '../../common/AllLanguageOutput';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { calculateDifferenceInTime } from '../../common/Utils';
import { QuestionProps } from "../common/QuestionProps";

export function NumberEnterQuestionShow(props: QuestionProps): JSX.Element {
    let firstAnswer: Answer = null;
    let realAnswer: AnswerData = null;
    let secondAnswer: Answer = null;
    let showAnswer: boolean = false;
    if (props.question?.real_answers?.length > 0
        && props.question?.question_data?.answers?.length > 0) {
        firstAnswer = props.question.real_answers.find((answer) => answer.team == 1);
        secondAnswer = props.question.real_answers.find((answer) => answer.team == 2);
        realAnswer = props.question.question_data.answers[0];
        showAnswer = realAnswer?.correct_value && props.question.is_complete;
    }
    return (
        <AutoScaleMaterialRow>
            <AutoScaleMaterialColumn xs={8} sm={4}>
                <AutoScaleMaterialRow>
                    <AutoScaleMaterialColumn className={firstAnswer && getBackgroundCssClassForTeam(1)}>
                        {showAnswer ? <AllLanguageOutput text={[firstAnswer?.value?.toString()]} /> : "?"}
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn>
                        <AutoScaleMaterialRow>
                            {showAnswer ? <AllLanguageOutput text={[realAnswer.correct_value.toString()]} /> : "?"}
                        </AutoScaleMaterialRow>
                        {
                            showAnswer &&
                            <AutoScaleMaterialRow>
                                <AutoScaleMaterialColumn className={getBackgroundCssClassForTeam(1)}>
                                    <AllLanguageOutput text={firstAnswer?.value ? [Math.abs(realAnswer.correct_value - firstAnswer.value).toString()] : ["."]} />
                                    <AllLanguageOutput text={props.question.start && firstAnswer?.created ? [`${calculateDifferenceInTime(props.question.start, firstAnswer.created)} s`] : []} />
                                </AutoScaleMaterialColumn>
                                <AutoScaleMaterialColumn className={getBackgroundCssClassForTeam(2)}>
                                    <AllLanguageOutput text={secondAnswer?.value ? [Math.abs(realAnswer.correct_value - secondAnswer.value).toString()] : ["."]} />
                                    <AllLanguageOutput text={props.question.start && secondAnswer?.created ? [`${calculateDifferenceInTime(props.question.start, secondAnswer.created)} s`] : []} />
                                </AutoScaleMaterialColumn>
                            </AutoScaleMaterialRow>
                        }
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn className={secondAnswer && getBackgroundCssClassForTeam(2)}>
                        {showAnswer ? <AllLanguageOutput text={[secondAnswer?.value?.toString()]} /> : "?"}
                    </AutoScaleMaterialColumn>
                </AutoScaleMaterialRow>
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>
    )
}