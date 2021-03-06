import * as React from 'react'
import { ApiClient } from './apiclient/ApiClient'
import Header from './components/header'
import { HostSettingsContent } from './components/HostSettingsContent'
import { MenuData } from './components/menu/MenuItem'
import AppMode from './enums/AppModes'
import { ClientRole } from './enums/ClientRole'
import { GameStatus } from './enums/GameStatus'

export function HostSettings(props: {}): JSX.Element {
    const menuItems: MenuData[] = [
        { 'name': 'Select a game', 'mode': AppMode.GameSelection },
        { 'name': 'Game creation', 'mode': AppMode.GameCreation },
        { 'name': 'Question creation', 'mode': AppMode.QuestionCreation }
    ];

    ApiClient.getClientWithRole(ClientRole.Host);

    const [appMode, changeAppMode] = React.useState<AppMode>(AppMode.GameSelection);

    return <>
        <Header
            menuItems={menuItems}
            currentMode={appMode}
            currentRole={ClientRole.Host}
            status={GameStatus.UNDEFINED}
            title={'Game host settings'}
            changeModeAction={(mode:AppMode): void => {
                changeAppMode(mode);
            }}
        />
        <HostSettingsContent mode={appMode} />
    </>
}