import * as React from 'react'
import { AutoScaleMaterialColumn } from './common/AutoScaleMaterialColumn';
import { MainGameContentProps } from './common/MainGameContentProps';
import { GameStateChanging } from './settings/GameStateChanging';
import { GameQuestionSelection } from './settings/GameQuestionSelection';

export function GameContentGameSettings(props: MainGameContentProps): JSX.Element {
    return <AutoScaleMaterialColumn>
        <GameStateChanging {...props} />
        <GameQuestionSelection {...props} />
    </AutoScaleMaterialColumn>
}