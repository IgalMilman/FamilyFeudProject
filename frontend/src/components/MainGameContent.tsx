import * as React from 'react'
import AppMode from '../enums/AppModes';
import { MainGameContentProps } from './common/MainGameContentProps';
import { GameContentGameSettings } from './GameContentGameSettings';
import { MainView } from './common/MainView';
import { GameContentDashboard } from './GameContentDashboard';
import { GameContentScreen } from './GameContentScreen';
import { GameSurveySelection } from './settings/GameSurveySelection';

export function MainGameContent(props: MainGameContentProps): JSX.Element {
    let mainElement = undefined;
    switch (props.currentMode) {
        case AppMode.GameSettings:
            mainElement = <GameContentGameSettings {...props} />
            break;
        case AppMode.Dashboard:
            mainElement = <GameContentDashboard {...props} />
            break;
        case AppMode.SurveySelection:
            mainElement = <GameSurveySelection {...props} />
            break;
        default:
            mainElement = <GameContentScreen {...props} />
    }
    return (
        <MainView>
            {mainElement}
        </MainView>
    )
}