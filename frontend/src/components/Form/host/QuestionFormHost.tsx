import * as React from 'react'
import { QuestionType, QuestionTypeFromNumber } from '../../../enums/QuestionType'
import { QuestionDisplay } from '../common/QuestionDisplay';
import { QuestionProps } from '../common/QuestionProps';
import { FamilyFeudQuestionHost } from './FamilyFeudQuestionHost';
import { NumberEnterQuestionHost } from './NumberEnterQuestionHost';
import { ButtonQuestionHost } from './ButtonQuestionHost';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { SubmitButton } from '../../common/QuestionSubmitButton';
import SubmitButtonType from '../../../enums/SubmitButtonType';
import { ApiClient } from '../../../apiclient/ApiClient';

export function QuestionFormHost(props: QuestionProps): JSX.Element {
    let formItem = null;
    switch (QuestionTypeFromNumber(props.question?.question_data?.qtype)) {
        case (QuestionType.NumberEnter): {
            formItem = (<NumberEnterQuestionHost {...props} />)
            break;
        }
        case (QuestionType.FamilyFeud): {
            formItem = (<FamilyFeudQuestionHost {...props} />)
            break;
        }
        case (QuestionType.FirstButton): {
            formItem = (<ButtonQuestionHost {...props} />)
            break;
        }
    }
    const assignQuestion = (teamnumber:1|2) => {
        ApiClient.getClient(undefined).revealQuestion(props.question?.id);
    }
    const revealQuestionAction = () => {
        ApiClient.getClient(undefined).revealQuestion(props.question?.id);
    }
    const closeQuestionAction = () => {
        ApiClient.getClient(undefined).completeQuestion(props.question?.id);
    }
    return (
        <>
            <AutoScaleMaterialRow>
                <AutoScaleMaterialColumn>
                        <SubmitButton
                            type={SubmitButtonType.SubmitAnswer}
                            text="Assign question"
                            disabled={false}
                            onClick={()=>assignQuestion(1)} />
                </AutoScaleMaterialColumn>
                <AutoScaleMaterialColumn>
                    <AutoScaleMaterialRow>
                        <SubmitButton
                            type={SubmitButtonType.SubmitAnswer}
                            text="Reveal question"
                            disabled={false}
                            onClick={revealQuestionAction} />
                        <SubmitButton
                            type={SubmitButtonType.SubmitAnswer}
                            text="Close question"
                            disabled={false}
                            onClick={closeQuestionAction} />
                    </AutoScaleMaterialRow>
                    <AutoScaleMaterialRow>
                        <QuestionDisplay
                            question={props.question}
                        />
                    </AutoScaleMaterialRow>
                </AutoScaleMaterialColumn>
                <AutoScaleMaterialColumn>
                        <SubmitButton
                            type={SubmitButtonType.SubmitAnswer}
                            text="Assign question"
                            disabled={false}
                            onClick={()=>assignQuestion(2)} />
                </AutoScaleMaterialColumn>
            </AutoScaleMaterialRow>
            {formItem}
        </>
    )
}