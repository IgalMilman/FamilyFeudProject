import * as React from 'react'
import Header from './components/header'
import { TeamSummaryHeader } from './components/headerElements/TeamSummaryHeader';
import AppMode from './enums/AppModes';
import { MainGameContent } from './components/MainGameContent';
import { ApiClient } from './apiclient/ApiClient';
import { useInterval } from './apiclient/UseInterval';
import { ClientRole, ClientRoleFromString } from './enums/ClientRole';
import { Game } from './apiclient/models/Game';
import { GameStatus, GameStatusFromString } from './enums/GameStatus';
import { MenuData } from './components/menu/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { redirect } from './apiclient/CommonMethods';

export const GameContent = (props: { role: string, team: 1 | 2 | undefined, gameid: string }) => {
  const pollInterval: number = 5;
  const role: ClientRole = ClientRoleFromString(props.role);
  const [mode, changeMode] = React.useState<AppMode>(role == ClientRole.Host ?
    AppMode.GameSettings :
    AppMode.QuestionMode);
  const [game, changeGame] = React.useState<Game>(null);
  const [autoPollPeriod, changeAutoPoll] = React.useState<number>(5);
  if (game) {
    game.gameStatus = GameStatusFromString(game.status);
  }
  React.useEffect(() => {
    ApiClient.getClientWithRoleAndGame(role, props.gameid);
  }, []);
  const updateGameStatus: () => void = () => {
    ApiClient.getClient().getGame().then(
      (value: Game) => {
        changeGame(value);
      }
    )
  }
  useInterval(updateGameStatus, autoPollPeriod);

  const toggleAutoPoll: () => void = () => {
    changeAutoPoll(autoPollPeriod ? null : pollInterval);
  }

  const status: GameStatus = game?.gameStatus;
  const menuItems: MenuData[] = role == ClientRole.Host ? [
    { 'name': 'Dashboard', 'mode': AppMode.Dashboard },
    { 'name': 'Question selection', 'mode': AppMode.GameSettings },
    { 'name': 'Survey selection', 'mode': AppMode.SurveySelection },
    { 'name': 'Question mode', 'mode': AppMode.QuestionMode },
    { 'name': 'Host settings', 'mode': undefined, 'additionalClickAction': () => redirect('/host-settings') },
    { 'name': 'Autopoll', 'mode': undefined, 'additionalClickAction': toggleAutoPoll, 'icon': autoPollPeriod ? <CheckIcon /> : <ClearIcon /> }
  ] : [
    { 'name': 'Question mode', 'mode': AppMode.QuestionMode },
    { 'name': 'Autopoll', 'mode': undefined, 'additionalClickAction': toggleAutoPoll, 'icon': autoPollPeriod ? <CheckIcon /> : <ClearIcon /> }
  ]

  return (
    <>
      <Header
        menuItems={menuItems}
        currentMode={mode}
        currentRole={role}
        status={status}
        teamNumber={props.team}
        titleProvider={
          () => {
            return `Family Feud`;
          }
        }
        title={game?.title}
        changeModeAction={(mode: AppMode) => {
          changeMode(mode);
          ApiClient.getClient().getGame().then(
            (value: Game) => {
              changeGame(value);
            }
          );
        }}
        beforeTitleElement={game?.teams?.length > 1 && <TeamSummaryHeader team={game.teams[0]} />}
        afterTitleElement={game?.teams?.length > 1 && <TeamSummaryHeader team={game.teams[1]} />}
      />
      <MainGameContent
        currentMode={mode}
        game={game}
        currentRole={role}
        status={status}
        teamNumber={props.team}
        changeAppMode={changeMode} />
    </>
  )
}
