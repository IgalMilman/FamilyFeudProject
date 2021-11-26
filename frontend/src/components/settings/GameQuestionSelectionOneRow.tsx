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
    return (
        <AutoScaleMaterialRow style={{ textDecoration : props.question?.has_real ? 'line-through' : 'none' }}>
            <AutoScaleMaterialColumn justifyContent="flex-end" alignItems="flex-end">
                <AllLanguageOutput text={props.question?.text} />
            </AutoScaleMaterialColumn>
            <AutoScaleMaterialColumn justifyContent="flex-start" alignItems="flex-start">
                <SubmitButton
                    type={SubmitButtonType.SubmitAnswer}
                    disabled={false}
                    onClick={() => props.questionSelectionAction(props.question)} />
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>
    )
}