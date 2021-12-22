import { Alert } from '@mui/material';
import * as React from 'react'
import { getCsrfToken } from '../../../apiclient/CommonMethods';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { InputFieldWithLabel } from '../../common/InputFieldWithLabel';
import { LoginButton } from './LoginButton';


interface AccessCodeLoginFormProps {
    currentAccessCode?: string;
    errorMessage?: string;
}

export const AccessCodeLoginForm = (props: AccessCodeLoginFormProps): JSX.Element => {
    const [accessCode, changeAccessCode] = React.useState<string>(props.currentAccessCode ? props.currentAccessCode : '');
    return <AutoScaleMaterialColumn>
        <form action='/login/accesscode'
            method='POST'>
            <input type='hidden' name='csrfmiddlewaretoken' value={getCsrfToken()} />
            <AutoScaleMaterialColumn spacing={1}>
            {props.errorMessage && <Alert severity="error">{props.errorMessage}</Alert>}
            <InputFieldWithLabel
                label={'Access code'}
                inputtype={'text'}
                name={'access_code'}
                currentValue={accessCode}
                onChange={changeAccessCode}
                required={true}
            />
            <LoginButton />
            </AutoScaleMaterialColumn>
        </form>
    </AutoScaleMaterialColumn>;
}