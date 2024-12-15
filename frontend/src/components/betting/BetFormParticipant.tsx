import { TextField } from '@mui/material';
import * as React from 'react'
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AllLanguageOutput } from '../common/AllLanguageOutput';
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow';
import { SubmitButton } from '../common/QuestionSubmitButton';
import SubmitButtonType from '../../enums/SubmitButtonType';
import { ApiClient } from '../../apiclient/ApiClient';
import { BetProps } from './BetProps';
import { PlaceBetAction } from '../../apiclient/models/PlaceBetAction';
import { Team } from '../../apiclient/models/Team';

interface BetFormParticipantProps extends BetProps {
    team: Team;
}

export function BetFormParticipant(props: BetFormParticipantProps): JSX.Element {
    const [value, changeValue] = React.useState<string>("0");
 
    const betPlaced: boolean = !!(props.betOpportunity.bets?.find((bet) => bet.team == props.teamNumber && !!bet.id));
    if (betPlaced) {
        return <AutoScaleMaterialColumn>
            <AllLanguageOutput text={["You have already placed a bet!"]} />
        </AutoScaleMaterialColumn>;
    }
    const onChange = (event: { target: { value: string; }; }) => {
        if (Number.parseInt(event.target.value) > props.team.points) {
            event.target.value = props.team.points.toString();
        }
        if (Number.parseInt(event.target.value) < 0) {
            event.target.value = "0";
        }
        changeValue(event.target.value ?? "0");
    }
    return (
        <AutoScaleMaterialColumn>
            <AutoScaleMaterialRow>
                <AllLanguageOutput text={["Place your bet!"]} />
            </AutoScaleMaterialRow>
            <AutoScaleMaterialRow>
                <TextField
                    autoComplete='off'
                    type="number"
                    onChange={onChange}
                    value={value ? value : 0}
                />
                <SubmitButton type={SubmitButtonType.SubmitAnswer} disabled={!value} onClick={() => {
                    let answer: PlaceBetAction = new PlaceBetAction();
                    answer.bet = Number.parseInt(value);
                    answer.teamnumber = props.teamNumber;
                    ApiClient.getClient().placeBet(props.betOpportunity?.id, answer)
                }} />
            </AutoScaleMaterialRow>
        </AutoScaleMaterialColumn>
    )
}