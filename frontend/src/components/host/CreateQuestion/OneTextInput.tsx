import { TextField } from "@mui/material";
import * as React from "react";

interface OneTextInputProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  optional?: boolean;
}

export const OneTextInput = (props: OneTextInputProps): JSX.Element => {
  const [value, onValueChange] = React.useState<string>('');
  const [error, changeError] = React.useState<string>('This field is required');
  React.useEffect(()=>{
    onValueChange(props.value ? props.value : '');
  }, [props.value]);
  const onChange = (event: { target: { value: string } }): void => {
    if (!event.target.value) {
      changeError('This field is required');
      onValueChange('');
    } else {
      changeError(null);
      onValueChange(event.target.value);
    }
  }
  const onBlur = (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
    if (event.target.value == undefined || event.target.value == '' || event.target.value == null) {
      props.onChange(null);
    }
    else {
      props.onChange(event.target.value);
    }
  }
  return (
    <TextField
      autoComplete='off'
      required={!props.optional}
      type="text"
      label={props.title}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      fullWidth
      error={!props.optional && !!error}
      helperText={!props.optional && error}
    />
  );
};
