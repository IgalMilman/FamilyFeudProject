import { TextField } from '@mui/material';
import * as React from 'react';
import { ApiClient } from '../../../apiclient/ApiClient';
import { APIResponse } from '../../../apiclient/models/APIResponse';
import { Team } from '../../../apiclient/models/Team';
import { TeamNameChangeRequest } from '../../../apiclient/models/TeamNameChange';
import SubmitButtonType from '../../../enums/SubmitButtonType';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { MessageArea, MessageAreaProps } from '../../common/MessageArea';
import { SubmitButton } from '../../common/QuestionSubmitButton';

interface EnterTeamsNamePatricipantProps {
    teamName?: string;
    teamNumber: 1 | 2;
}

export function EnterTeamsNamePatricipant(props: EnterTeamsNamePatricipantProps): JSX.Element {
    const [value, valueChange] = React.useState<string>(props.teamName ? props.teamName : "");
    const [message, changeMessage] = React.useState<MessageAreaProps>(null);
    function onValueChange(event: { target: { value: string; }; }) {
        valueChange(event?.target?.value ? event.target.value : "");
    }

    return (
        <AutoScaleMaterialRow>
            <AutoScaleMaterialColumn>
                <MessageArea {...message} />
                <AutoScaleMaterialRow>
                    <TextField
                        type="text"
                        onChange={onValueChange}
                        value={value}
                    />
                </AutoScaleMaterialRow>
                <AutoScaleMaterialRow>
                    <SubmitButton text="Save team name" type={SubmitButtonType.SubmitAnswer} disabled={!value} onClick={() => {
                        const request: TeamNameChangeRequest = new TeamNameChangeRequest();
                        request.name = value;
                        ApiClient.getClient().changeTeamName(request, props.teamNumber).then((response: APIResponse<Team>) => {
                            if (response.status == 200) {
                                changeMessage({ type: 'success', text: 'Team name saved!' });
                            }
                            else {
                                changeMessage({ type: 'error', text: 'Encountered an error while saving the tema name' });
                            }
                        }
                        )
                    }} />
                </AutoScaleMaterialRow>
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>);
}