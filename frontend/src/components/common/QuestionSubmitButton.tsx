import * as React from 'react'
import SubmitButtonType from '../../enums/SubmitButtonType';
import StyledButton from '../styled/Button';

interface SubmitButtonProps {
    type: SubmitButtonType;
    text?: string;
    disabled: boolean;
    onClick: () => void;
}

export function SubmitButton(props: SubmitButtonProps): JSX.Element {
    let buttonText = props.text;
    if (!buttonText) {
        switch (props.type) {
            case (SubmitButtonType.Login):
                buttonText = "Login";
            case (SubmitButtonType.SubmitAnswer):
                buttonText = "Submit";
        }
    }
    return (
        <StyledButton disabled={props.disabled} onClick={props.onClick}>
            {buttonText}
        </StyledButton>
    );
}