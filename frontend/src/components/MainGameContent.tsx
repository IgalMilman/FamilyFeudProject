
import * as React from 'react'
import { AutoScaleMaterialColumn } from './common/AutoScaleMaterialColumn';
import AppMode from '../enums/AppModes';
import { MainGameContentProps } from './common/MainGameContentProps';
import { GameContentQuestion } from './GameContentQuestion';
import { GameContentGameSettings } from './GameContentGameSettings';

export function MainGameContent(props: MainGameContentProps): JSX.Element {
    let mainElement = undefined;
    switch (props.currentMode) {
        case AppMode.GameSettings:
            mainElement = <GameContentGameSettings {...props}/>
            break;
        default:
            mainElement = <GameContentQuestion {...props}/>
    }
    return (
        <AutoScaleMaterialColumn
        spacing={2}
        >
                {mainElement}
        </AutoScaleMaterialColumn>
    )
}