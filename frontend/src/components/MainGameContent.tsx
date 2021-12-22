import * as React from 'react'
import AppMode from '../enums/AppModes';
import { MainGameContentProps } from './common/MainGameContentProps';
import { GameContentQuestion } from './GameContentQuestion';
import { GameContentGameSettings } from './GameContentGameSettings';
import { MainView } from './common/MainView';
import { GameContentDashboard } from './GameContentDashboard';

export function MainGameContent(props: MainGameContentProps): JSX.Element {
    let mainElement = undefined;
    switch (props.currentMode) {
        case AppMode.GameSettings:
            mainElement = <GameContentGameSettings {...props} />
            break;
        case AppMode.Dashboard:
            mainElement = <GameContentDashboard {...props} />
            break;
        default:
            mainElement = <GameContentQuestion {...props} />
    }
    return (
        <MainView>
            {mainElement}
        </MainView>
    )
}