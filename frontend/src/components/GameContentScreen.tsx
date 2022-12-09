import * as React from 'react'
import { GameStatus } from '../enums/GameStatus';
import { MainGameContentProps } from './common/MainGameContentProps';
import { GameContentQuestion } from './GameContentQuestion';
import { GameContentSurvey } from './GameContentSurvey';


export function GameContentScreen(props: MainGameContentProps): JSX.Element {
    switch(props.game?.gameStatus) {
        case GameStatus.QUESTION:
            return <GameContentQuestion {...props} />
        case GameStatus.SURVEY:
            return <GameContentSurvey {...props} />
        default:
            return <></>
    }
}