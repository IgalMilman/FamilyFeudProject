import * as React from 'react'
import { LoginMode } from '../enums/LoginMode'
import { AutoScaleMaterialColumn } from './common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from './common/AutoScaleMaterialRow';
import { AccessCodeLoginForm } from './form/login/AccessCodeLoginForm';
import { ChangeLoginMode } from './form/login/ChangeLoginMode';
import { UsernameLoginForm } from './form/login/UsernameLoginForm';

export interface LoginFormContentInterface {
    errormessage?: string;
    currentusername?: string;
    currentaccesscode?: string;
}

export const LoginFormContent = (props: LoginFormContentInterface): JSX.Element => {
    const [mode, changeMode] = React.useState<LoginMode>(props.currentusername === undefined ?
        LoginMode.ACCESS_CODE_LOGIN :
        LoginMode.USER_LOGIN)
    let mainElement = undefined;
    switch (mode) {
        case LoginMode.USER_LOGIN:
            mainElement = <UsernameLoginForm
                currentUsername={props.currentusername}
                errorMessage={props.errormessage}
            />
            break;
        default:
            mainElement = <AccessCodeLoginForm
                currentAccessCode={props.currentaccesscode}
                errorMessage={props.errormessage}
            />
    }
    return (
        <AutoScaleMaterialColumn
            spacing={2}>
            <AutoScaleMaterialRow>
                {mainElement}
            </AutoScaleMaterialRow>
            <AutoScaleMaterialRow>
                <ChangeLoginMode currentLoginMode={mode} onChange={changeMode} />
            </AutoScaleMaterialRow>
        </AutoScaleMaterialColumn>
    );
}