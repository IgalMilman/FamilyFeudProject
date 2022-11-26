import { TextField } from '@mui/material';
import * as React from 'react'

interface AnswerInputNumberProps {
    title?: string;
    setNumber: (value: number) => void;
    initialValue?: number;
    optional?: boolean;
}

export const AnswerInputNumber = (props: AnswerInputNumberProps): JSX.Element => {
    const [value, setValue] = React.useState<string>(props.initialValue ? props.initialValue.toString() : '0');
    React.useEffect(() => {
        setValue(props.initialValue ? props.initialValue.toString() : '0');
    }, [props.initialValue]);
    const [error, changeError] = React.useState<string>(null);
    const onValueChange = (event: { target: { value: string } }) => {
        if (event.target.value == undefined || event.target.value == '' || event.target.value == null) {
            changeError('This field is required');
            setValue('');
        } else {
            changeError(null);
            setValue(event.target.value);
        }
    }
    const onBlur = (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
        if (event.target.value == undefined || event.target.value == '' || event.target.value == null) {
            props.setNumber(null);
        }
        else {
            props.setNumber(parseInt(event.target.value));
        }
    }
    return <TextField
        required={!props.optional}
        autoComplete='off'
        type='number'
        value={value}
        onChange={onValueChange}
        onBlur={onBlur}
        label={props.title}
        error={!props.optional && !!error}
        helperText={!props.optional && error}
    />
}