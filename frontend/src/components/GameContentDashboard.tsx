import * as React from 'react'
import { MainGameContentProps } from './common/MainGameContentProps';
import { GameContentDashboardColumn } from './dashboard/GameContentDashboardColumn';
import { Team } from '../apiclient/models/Team';
import { getTeam } from './common/Utils';
import { getBackgroundCssClassForTeam } from '../enums/TeamColorsCss';

export function GameContentDashboard(props: MainGameContentProps): JSX.Element {
    const firstTeam: Team = getTeam(props.game, 1);
    const secondTeam: Team = getTeam(props.game, 2);
    return <>
        <GameContentDashboardColumn
            firstRow={firstTeam?.name}
            secondRow={firstTeam && `Points: ${firstTeam.points}`}
            thirdRow={firstTeam?.access_code && `Access code: ${firstTeam.access_code}`}
            className={getBackgroundCssClassForTeam(1)}
        />
        <GameContentDashboardColumn
            firstRow={props.game?.title}
            thirdRow={props.game?.viewer_access_code && `Access code: ${props.game.viewer_access_code}`}
        />
        <GameContentDashboardColumn
            firstRow={secondTeam?.name}
            secondRow={secondTeam && `Points: ${secondTeam.points}`}
            thirdRow={secondTeam?.access_code && `Access code: ${secondTeam.access_code}`}
            className={getBackgroundCssClassForTeam(2)}
        />
    </>
}