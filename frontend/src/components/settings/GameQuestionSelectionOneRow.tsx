import * as React from 'react'
import { QuestionData } from '../../apiclient/models/QuestionData';
import SubmitButtonType from '../../enums/SubmitButtonType';
import { AllLanguageOutput } from '../common/AllLanguageOutput';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow';
import { SubmitButton } from '../common/QuestionSubmitButton';

interface GameQuestionSelectionOneRowProps {
    question: QuestionData;
    questionSelectionAction: (question: QuestionData) => void;
}

export function GameQuestionSelectionOneRow(props: GameQuestionSelectionOneRowProps): JSX.Element {
    const className: string = props.question?.is_complete ? 'bordered line-through'
        : (props.question?.has_real ? 'bordered line-under' : 'bordered');
    return (
        <AutoScaleMaterialRow className={className}>
            <AutoScaleMaterialColumn justifyContent="flex-end" alignItems="flex-end">
                <AllLanguageOutput text={props.question?.text} />
            </AutoScaleMaterialColumn>
            <AutoScaleMaterialColumn justifyContent="flex-start" alignItems="flex-start">
                <SubmitButton
                    type={SubmitButtonType.SubmitAnswer}
                    text='Select question'
                    disabled={false}
                    onClick={() => props.questionSelectionAction(props.question)} />
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>
    )
}