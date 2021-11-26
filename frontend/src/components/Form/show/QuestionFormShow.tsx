
import * as React from 'react'
import { QuestionType, QuestionTypeFromNumber } from '../../../enums/QuestionType'
import { QuestionDisplay } from '../common/QuestionDisplay';
import { FamilyFeudQuestionShow } from './FamilyFeudQuestionShow';
import { NumberEnterQuestionShow } from './NumberEnterQuestionShow';
import { QuestionProps } from '../common/QuestionProps';
import { ButtonQuestionShow } from './ButtonQuestionShow';

export function QuestionFormShow(props: QuestionProps): JSX.Element {
    const questionType = QuestionTypeFromNumber(props.question?.question_data?.qtype);
    let formItem = null;
    switch (questionType) {
        case (QuestionType.NumberEnter): {
            formItem = (<NumberEnterQuestionShow {...props} />)
            break;
        }
        case (QuestionType.FamilyFeud): {
            formItem = (<FamilyFeudQuestionShow {...props} />)
            break;
        }
        case (QuestionType.FirstButton): {
            formItem = (<ButtonQuestionShow {...props} />)
            break;
        }
    }
    return (
        <>
            <QuestionDisplay
                question={props.question}
            />
            {formItem}
        </>
    )
}