import { TextField } from '@mui/material';
import * as React from 'react'
import { QuestionProps } from "../common/QuestionProps";

export function OpenQuestionParticipant(props: QuestionProps): JSX.Element {
    const onChange = (event: { target: { value: string; }; }) => {
        props.callBack(event.target.value);
    }
    return (
        <TextField
            autoComplete='off'
            type="text"
            onChange={onChange}
            value={props.value ? props.value : ""}
        />
    )
}