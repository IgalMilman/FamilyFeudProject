import * as React from 'react'
import { RealAnswer } from '../../../apiclient/models/RealAnswer';
import { getBackgroundCssClassForTeam } from '../../../enums/TeamColorsCss';
import { AllLanguageOutput } from '../../common/AllLanguageOutput';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { calculateDifferenceInTime } from '../../common/Utils';
import { QuestionProps } from "../common/QuestionProps";

export function ButtonQuestionShow(props: QuestionProps): JSX.Element {
    let firstAnswer: RealAnswer = props.question.real_answers.find((answer) => answer.team == 1);
    let secondAnswer: RealAnswer = props.question.real_answers.find((answer) => answer.team == 2);
    let realAnswer: string[] = undefined;
    if (props.question?.is_complete && props.question?.question_data?.answers?.length > 0) {
        realAnswer = props.question.question_data.answers[0]?.text;
    }
    return (
        <AutoScaleMaterialRow>
            <AutoScaleMaterialColumn>
                <AutoScaleMaterialRow>
                    <AutoScaleMaterialColumn className={firstAnswer ? getBackgroundCssClassForTeam(1) : undefined}>
                        <AllLanguageOutput text={props.question.start && firstAnswer?.created ? [`${calculateDifferenceInTime(props.question.start, firstAnswer.created)} s`] : ['.']} />
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn>
                        {realAnswer ? <AllLanguageOutput text={realAnswer} /> : "?"}
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn className={secondAnswer ? getBackgroundCssClassForTeam(2) : undefined}>
                        <AllLanguageOutput text={props.question.start && secondAnswer?.created ? [`${calculateDifferenceInTime(props.question.start, secondAnswer.created)} s`] : ['.']} />
                    </AutoScaleMaterialColumn>
                </AutoScaleMaterialRow>
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>
    )
}