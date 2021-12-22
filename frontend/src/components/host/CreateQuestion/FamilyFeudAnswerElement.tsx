import { TextField } from '@mui/material';
import * as React from 'react'
import { AnswerObject } from '../../../apiclient/models/createrequests/AnswerObject';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'
import { AnswerInputFamilyFeud } from './AnswerInputFamilyFeud';

interface FamilyFeudAnswerElementProps {
    numberOfLanguages: number;
    setAnswers: (answers: AnswerObject[]) => void;
}

export const FamilyFeudAnswerElement = (props: FamilyFeudAnswerElementProps): JSX.Element => {
    const answers: AnswerObject[] = [];
    const [numberOfAnswers, setNumberOfAnswers] = React.useState<number>(6);
    for (let i = 0; i < numberOfAnswers; i++) {
        answers.push(new AnswerObject());
    }
    props.setAnswers(answers);
    return <>
        <AutoScaleMaterialRow>
            <TextField type='number' label='Number of answers' value={numberOfAnswers} onChange={(event: { target: { value: string } }) => {
                setNumberOfAnswers(parseInt(event.target.value));
            }} />
        </AutoScaleMaterialRow>
        {answers.map(
            (value, index) => {
                return (
                    <AutoScaleMaterialRow key={index}>
                        <AutoScaleMaterialColumn spacing={1}>
                            <AnswerInputFamilyFeud
                                numberOfLanguages={props.numberOfLanguages}
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