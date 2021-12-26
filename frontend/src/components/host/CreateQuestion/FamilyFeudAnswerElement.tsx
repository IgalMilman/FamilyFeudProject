import { TextField } from '@mui/material';
import * as React from 'react'
import { AnswerObject } from '../../../apiclient/models/createrequests/AnswerObject';
import { QuestionObject } from '../../../apiclient/models/createrequests/QuetionObject';
import { Question } from '../../../apiclient/models/Question';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'
import { AnswerInputFamilyFeud } from './AnswerInputFamilyFeud';

interface FamilyFeudAnswerElementProps {
    question: QuestionObject
}

export const FamilyFeudAnswerElement = (props: FamilyFeudAnswerElementProps): JSX.Element => {
    const changeAnswerCount = (value: number): void => {
        props.question.scaleAnswerCount(value);
        setNumberOfAnswers(value);
    }
    const [numberOfAnswers, setNumberOfAnswers] = React.useState<number>(props.question.answers.length);
    return <>
        <AutoScaleMaterialRow>
            <TextField
                type='number'
                label='Number of answers'
                value={numberOfAnswers}
                onChange={(event: { target: { value: string } }) => {
                    changeAnswerCount(parseInt(event.target.value));
                }}
                autoComplete='off'
            />
        </AutoScaleMaterialRow>
        {props.question.answers.map(
            (value, index) => {
                return (
                    <AutoScaleMaterialRow key={index}>
                        <AutoScaleMaterialColumn spacing={1}>
                            <AnswerInputFamilyFeud
                                index={index}
                                answer={value}
                            />
                        </AutoScaleMaterialColumn>
                    </AutoScaleMaterialRow>
                )
            }
        )}
    </>
}