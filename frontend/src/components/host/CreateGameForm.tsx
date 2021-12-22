import { Alert, TextField } from '@mui/material';
import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { redirect } from '../../apiclient/CommonMethods';
import { APIResponse } from '../../apiclient/models/APIResponse';
import { CreateGameRequest } from '../../apiclient/models/CreateGameRequest';
import { GameSelectionOption } from '../../apiclient/models/GameSelectionOption';
import SubmitButtonType from '../../enums/SubmitButtonType';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow'
import { SubmitButton } from '../common/QuestionSubmitButton';

interface CreateGameFormProps {

}

export const CreateGameForm = (props: CreateGameFormProps): JSX.Element => {

    const [title, titleChange] = React.useState<string>('');
    const [error, setError] = React.useState<string>(null);
    return <AutoScaleMaterialColumn>
        {error && 
        <AutoScaleMaterialRow>
            <Alert severity="error">{error}</Alert>
        </AutoScaleMaterialRow>}
        <AutoScaleMaterialRow>
            <TextField
                type="text"
                onChange={(event: { target: { value: string; }; }): void => {
                    titleChange(event.target.value);
                }}
                value={title}
            />
        </AutoScaleMaterialRow>
        <AutoScaleMaterialRow>
            <SubmitButton type={SubmitButtonType.SubmitAnswer} disabled={!title} onClick={() => {
                const request: CreateGameRequest = new CreateGameRequest();
                request.title = title;
                ApiClient.getClient().createGame(request).then((response: APIResponse<GameSelectionOption>) => {
                    if (response && response.status == 200) {
                        redirect(response.data.url);
                    }
                    else {
                        setError('Could not create a game');
                    }
                })
            }} />
        </AutoScaleMaterialRow>
    </AutoScaleMaterialColumn>
}