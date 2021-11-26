import { TextField } from '@mui/material';
import * as React from 'react';
import { ApiClient } from '../../../apiclient/ApiClient';
import { TeamNameChangeRequest } from '../../../apiclient/models/TeamNameChange';
import SubmitButtonType from '../../../enums/SubmitButtonType';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { SubmitButton } from '../../common/QuestionSubmitButton';

interface EnterTeamsNamePatricipantProps {
    teamName?: string;
    teamNumber: 1 | 2;
}

export function EnterTeamsNamePatricipant(props: EnterTeamsNamePatricipantProps): JSX.Element {
    const [value, valueChange] = React.useState<string>(props.teamName ? props.teamName : "");
    function onValueChange(event: { target: { value: string; }; }) {
        valueChange(event?.target?.value ? event.target.value : "");
    }

    return (
        <AutoScaleMaterialRow>
            <AutoScaleMaterialColumn>
                <AutoScaleMaterialRow>
                    <TextField
                        type="text"
                        onChange={onValueChange}
                        value={value}
                    />
                </AutoScaleMaterialRow>
                <AutoScaleMaterialRow>
                    <SubmitButton type={SubmitButtonType.SubmitAnswer} disabled={!value} onClick={() => {
                        const request: TeamNameChangeRequest = new TeamNameChangeRequest();
                        request.name = value;
                        ApiClient.getClient(undefined).changeTeamName(request, props.teamNumber)
                    }} />
                </AutoScaleMaterialRow>
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>);
}