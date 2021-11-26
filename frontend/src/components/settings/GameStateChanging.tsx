import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { GameAction } from '../../apiclient/models/GameAction';
import { GameStatus, GameStatusFromString } from '../../enums/GameStatus';
import SubmitButtonType from '../../enums/SubmitButtonType';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow';
import { MainGameContentProps } from '../common/MainGameContentProps';
import { SubmitButton } from '../common/QuestionSubmitButton';


export function GameStateChanging(props: MainGameContentProps): JSX.Element {
    const [selection, changeSelection] = React.useState<string>(props.game?.gameStatus ? props.game.gameStatus : GameStatus.BEGINNING);
    const selectChnage = (event: SelectChangeEvent) => {
        changeSelection(event.target.value);
    }
    return (
        <AutoScaleMaterialRow>
            <AutoScaleMaterialColumn justifyContent="flex-end" alignItems="flex-end">
                <Select
                    value={selection}
                    name='state'
                    id='state'
                    onChange={selectChnage}>
                    <MenuItem value={GameStatus.BEGINNING}>Beginning</MenuItem>
                    <MenuItem value={GameStatus.QUESTION}>Question (Do not set directly)</MenuItem>
                    <MenuItem value={GameStatus.SETTING_TEAMS}>Setting teams</MenuItem>
                    <MenuItem value={GameStatus.DASHBOARD}>Dashboard</MenuItem>
                    <MenuItem value={GameStatus.ENDING}>End</MenuItem>
                </Select>
            </AutoScaleMaterialColumn>
            <AutoScaleMaterialColumn justifyContent="flex-start" alignItems="flex-start">
                <SubmitButton type={SubmitButtonType.SubmitAnswer} disabled={selection == GameStatus.QUESTION} onClick={function (): void {
                    const action: GameAction = new GameAction();
                    action.action = 'set_status';
                    action.status = GameStatusFromString(selection);
                    ApiClient.getClient(undefined).performActionOnGame(props.game?.id, action);
                }} />
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>
    )
}