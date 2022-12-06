import { Alert } from '@mui/material';
import * as React from 'react'
import { getCsrfToken } from '../../../apiclient/CommonMethods';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { InputFieldWithLabel } from '../../common/InputFieldWithLabel';
import { LoginButton } from './LoginButton';


interface UsernameLoginFormProps {
    currentUsername?: string;
    errorMessage?: string;
}

export const UsernameLoginForm = (props: UsernameLoginFormProps): JSX.Element => {
    const [username, changeUsername] = React.useState<string>(props.currentUsername ? props.currentUsername : '');
    const [password, changePassword] = React.useState<string>('');
    return <AutoScaleMaterialColumn>
        <form action='/login/username'
            method='POST'>
            <input type='hidden' name='csrfmiddlewaretoken' value={getCsrfToken()} />
            <AutoScaleMaterialColumn spacing={1}>
            {props.errorMessage && <Alert severity="error">{props.errorMessage}</Alert>}
            <InputFieldWithLabel
                label={'Username'}
                name={'username'}
                inputtype={'text'}
                currentValue={username}
                onChange={changeUsername}
                required={true}
            />
            <InputFieldWithLabel
                label={'Password'}
                name={'password'}
                inputtype={'password'}
                currentValue={password}
                onChange={changePassword}
                required={true}
            />
            <LoginButton />
            </AutoScaleMaterialColumn>
        </form>
    </AutoScaleMaterialColumn>;
}