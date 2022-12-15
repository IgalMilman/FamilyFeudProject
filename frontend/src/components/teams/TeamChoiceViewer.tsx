import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { PlayerListing } from '../../apiclient/models/Player';
import { useInterval } from '../../apiclient/UseInterval';
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow';
import { TeamChoiceViewerColumn } from './components/TeamChoiceViewerColumn';

interface TeamChoiceViewerProps {
}

export const TeamChoiceViewer = (props: TeamChoiceViewerProps): JSX.Element => {
    const [playerList, setPlayerList] = React.useState<PlayerListing>(null);
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
    return <>
        <TeamChoiceViewerColumn players={playerList.teams[1] ?? []} team={1} />
        <TeamChoiceViewerColumn players={playerList.teams[0] ?? []} team={0} />
        <TeamChoiceViewerColumn players={playerList.teams[2] ?? []} team={2} />
    </>
}