import * as React from 'react'
import Header from './components/Header'
import { TeamSummaryHeader } from './components/headerElements/TeamSummaryHeader';
import AppMode from './enums/AppModes';
import { MainGameContent } from './components/MainGameContent';
import { ApiClient } from './apiclient/ApiClient';
import { useInterval } from './apiclient/UseInterval';
import { ClientRole, ClientRoleFromString, GetFixedClientRole } from './enums/ClientRole';
import { Game } from './apiclient/models/Game';
import { GameStatus, GameStatusFromString } from './enums/GameStatus';
import { MenuData } from './components/menu/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { redirect } from './apiclient/CommonMethods';
import { MessageArea, MessageAreaProps } from './components/common/MessageArea';

export const GameContent = (props: { role: string, team: 1 | 2 | undefined, gameid: string }) => {

  const realRole: ClientRole = ClientRoleFromString(props.role);
  const [mode, changeMode] = React.useState<AppMode>(realRole == ClientRole.Host ?
    AppMode.GameSettings :
    AppMode.QuestionMode);
  const [game, changeGame] = React.useState<Game>(null);
  const [message, setMessage] = React.useState<MessageAreaProps>(null);
  if (game) {
    game.gameStatus = GameStatusFromString(game.status);
  }
  const role: ClientRole = (realRole == ClientRole.ViewerParticipant && game?.is_captain) ? ClientRole.Participant : GetFixedClientRole(realRole);
  const pollInterval: number = role == ClientRole.ViewerParticipant ? 10 : 1;
  const [autoPollPeriod, changeAutoPoll] = React.useState<number>(pollInterval);
  React.useEffect(() => {
    ApiClient.getClientWithRoleAndGame(role, props.gameid);
    if (role === ClientRole.Participant) {
      setMessage({ type: 'success', text: 'Congradulations! You are the captain' });
      setTimeout(() => { setMessage(undefined) }, 20000);
    }
    if (autoPollPeriod && (pollInterval != autoPollPeriod)) {
      changeAutoPoll(pollInterval);
    }
  }, [role]);
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
    { 'name': 'Game settings', 'mode': AppMode.GameSettings },
    { 'name': 'Survey selection', 'mode': AppMode.SurveySelection },
    { 'name': 'Game mode', 'mode': AppMode.QuestionMode },
    { 'name': 'User settings', 'mode': AppMode.UserSetup },
    { 'name': 'Host settings', 'mode': undefined, 'additionalClickAction': () => redirect('/host-settings') },
    { 'name': 'Autopoll', 'mode': undefined, 'additionalClickAction': toggleAutoPoll, 'icon': autoPollPeriod ? <CheckIcon /> : <ClearIcon /> }
  ] : [
    { 'name': 'Game mode', 'mode': AppMode.QuestionMode },
    { 'name': 'Autopoll', 'mode': undefined, 'additionalClickAction': toggleAutoPoll, 'icon': autoPollPeriod ? <CheckIcon /> : <ClearIcon /> }
  ]

  return (
    <>
      <Header
        menuItems={menuItems}
        currentMode={mode}
        currentRole={role}
        realRole={realRole}
        status={status}
        teamNumber={game?.team_on}
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
      {message && <MessageArea {...message} />}
      <MainGameContent
        currentMode={mode}
        game={game}
        currentRole={role}
        realRole={realRole}
        status={status}
        teamNumber={game?.team_on}
        changeAppMode={changeMode} />
    </>
  )
}
