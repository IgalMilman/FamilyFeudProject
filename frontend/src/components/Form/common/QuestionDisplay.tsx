import * as React from 'react'
import { AllLanguageOutput } from '../../common/AllLanguageOutput'
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn'
import { QuestionProps } from './QuestionProps'

export function QuestionDisplay(props: QuestionProps): JSX.Element {
    return (
        <AutoScaleMaterialColumn xs={6}>
            {<AllLanguageOutput
                text={props.question?.question_data?.text}
                props={{ variant: 'h6', align: 'center', mt: 2, mb: 2 }}
            />
            }
        </AutoScaleMaterialColumn>
    )
}