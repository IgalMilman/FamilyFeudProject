import { Box } from '@mui/material';
import * as React from 'react'
import { getBackgroundCssClassForTeam } from '../../../enums/TeamColorsCss';
import { AllLanguageOutput } from '../../common/AllLanguageOutput';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { QuestionProps } from "../common/QuestionProps";

export function ButtonQuestionShow(props: QuestionProps): JSX.Element {
    let firstAnswer: boolean = false;
    let secondAnswer: boolean = false;
    if (props.question?.real_answers?.length > 0) {
        switch (props.question.real_answers[0]?.team) {
            case (1):
                firstAnswer = true;
                break;
            case (2):
                secondAnswer = true;
                break;
        }
    }
    if (props.question?.real_answers?.length > 1) {
        switch (props.question.real_answers[1]?.team) {
            case (1):
                firstAnswer = true;
                break;
            case (2):
                secondAnswer = true;
                break;
        }
    }
    let realAnswer: string[] = undefined;
    if (props.question?.is_complete && props.question?.question_data?.answers?.length > 0) {
        realAnswer = props.question.question_data.answers[0]?.text;
    }
    return (
        <AutoScaleMaterialRow>
            <AutoScaleMaterialColumn>
                <AutoScaleMaterialRow>
                    <AutoScaleMaterialColumn className={firstAnswer ? getBackgroundCssClassForTeam(1) : undefined}>
                        .
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn>
                        {realAnswer ? <AllLanguageOutput text={realAnswer} /> : "?"}
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn className={secondAnswer ? getBackgroundCssClassForTeam(2) : undefined}>
                        .
                    </AutoScaleMaterialColumn>
                </AutoScaleMaterialRow>
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>
    )
}