import { Button } from '@mui/material'
import * as React from 'react'
import { LoginMode } from '../../../enums/LoginMode'

interface ChangeLoginModeProps {
    currentLoginMode: LoginMode;
    onChange: (mode: LoginMode) => void;
}

export const ChangeLoginMode = (props: ChangeLoginModeProps): JSX.Element => {
    return <Button variant="text" onClick={
        () => {
            props.onChange(props.currentLoginMode == LoginMode.USER_LOGIN ?
                LoginMode.ACCESS_CODE_LOGIN :
                LoginMode.USER_LOGIN);
        }
    }>
        {props.currentLoginMode == LoginMode.USER_LOGIN ?
            'Login with access code' :
            'Login with username and password'}
    </Button>
}