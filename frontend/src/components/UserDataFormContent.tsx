import { Alert } from '@mui/material';
import * as React from 'react'
import { getCsrfToken } from '../apiclient/CommonMethods';
import { AutoScaleMaterialColumn } from './common/AutoScaleMaterialColumn';
import { InputFieldWithLabel } from './common/InputFieldWithLabel';
import StyledButton from './styled/Button';


export interface UsernameLoginFormProps {
    gameid?: string;
    errorMessage?: string;
}

export const UsernameLoginForm = (props: UsernameLoginFormProps): JSX.Element => {
    const [firstName, changeFirstName] = React.useState<string>('');
    return <AutoScaleMaterialColumn>
        <form action='/user/activate'
            method='POST'>
            <input type='hidden' name='csrfmiddlewaretoken' value={getCsrfToken()} />
            <input type='hidden' name='game_id' value={props.gameid} />
            <AutoScaleMaterialColumn spacing={1}>
                {props.errorMessage && <Alert severity="error">{props.errorMessage}</Alert>}
                <InputFieldWithLabel
                    label={'First name'}
                    name={'first_name'}
                    inputtype={'text'}
                    currentValue={firstName}
                    onChange={changeFirstName}
                    required={true}
                />
                <StyledButton type="submit">
                    Save
                </StyledButton>
            </AutoScaleMaterialColumn>
        </form>
    </AutoScaleMaterialColumn>;
}