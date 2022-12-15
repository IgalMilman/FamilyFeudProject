import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { PlayerListing } from '../../apiclient/models/Player';
import { useInterval } from '../../apiclient/UseInterval';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow';
import { MessageArea, MessageAreaProps } from '../common/MessageArea';
import { PlayerActionHostColumn } from './components/PlayerActionHostColumn';

interface TeamChoiceHostProps {
}

export const TeamChoiceHost = (props: TeamChoiceHostProps): JSX.Element => {
    const [playerList, setPlayerList] = React.useState<PlayerListing>(null);
    const [message, changeMessage] = React.useState<MessageAreaProps>(null);
    const queryPlayerListing = () => {
        ApiClient.getClient().getPlayerListing().then(
            (value) => {
                setPlayerList(value);
            }
        )
    }
    useInterval(queryPlayerListing, 8);
    if (!playerList) {
        return <></>
    }
    const assignTeam = (playerId: number, team: number): void => {
        ApiClient.getClient().assignUserToTeam(playerId, team).then((success: boolean) => {
            if (success) {
                changeMessage({
                    text: "Successfully assigned user",
                    type: 'success',
                })
            }
            else {
                changeMessage({
                    text: "Could not assign user",
                    type: 'error',
                })
            }
            setTimeout(() => { changeMessage(null) }, 10000);
        });
    }
    return <AutoScaleMaterialColumn>
        {message && <MessageArea {...message} />}
        <AutoScaleMaterialRow>
            <PlayerActionHostColumn 
                key={1} 
                players={playerList.teams[1] ?? []} team={1} 
                leftAction={(playerId: number) => { assignTeam(playerId, 0) }} 
                titleLeftButton="Remove from the team" 
                rightAction={(playerId: number) => { assignTeam(playerId, 2) }} 
                titleRightButton="Move to the second team"
            />
            <PlayerActionHostColumn 
                key={0} 
                players={playerList.teams[0] ?? []} team={0} 
                leftAction={(playerId: number) => { assignTeam(playerId, 1) }} 
                titleLeftButton="Move to the first team"
                rightAction={(playerId: number) => { assignTeam(playerId, 2) }} 
                titleRightButton="Move to the second team"
            />
            <PlayerActionHostColumn 
                key={2} 
                players={playerList.teams[2] ?? []} team={2} 
                leftAction={(playerId: number) => { assignTeam(playerId, 1) }} 
                titleLeftButton="Move to the first team"
                rightAction={(playerId: number) => { assignTeam(playerId, 0) }} 
                titleRightButton="Remove from the team" 
            />
        </AutoScaleMaterialRow>
    </AutoScaleMaterialColumn>
}