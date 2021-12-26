import { TextField } from '@mui/material'
import * as React from 'react'
import { AutoScaleMaterialRow } from './AutoScaleMaterialRow'

interface InputFieldWithLabelProps {
    label?: string;
    placeholder?: string;
    name: string;
    inputtype: 'text' | 'password' | 'number';
    currentValue: string;
    required: boolean;
    onChange?: (value: string) => void;
}

export const InputFieldWithLabel = (props: InputFieldWithLabelProps): JSX.Element => {
    return <AutoScaleMaterialRow>
        <TextField
            autoComplete='off'
            label={props.label}
            type={props.inputtype}
            value={props.currentValue}
            placeholder={props.placeholder}
            required={props.required}
            name={props.name}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                props.onChange(event.target.value);
            }}
        />
    </AutoScaleMaterialRow>
}