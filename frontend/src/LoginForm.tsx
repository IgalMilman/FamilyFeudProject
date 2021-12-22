import * as React from 'react'
import { MainView } from './components/common/MainView';
import Header from './components/header'
import { LoginFormContent, LoginFormContentInterface } from './components/LoginFormContent';
import AppMode from './enums/AppModes';
import { ClientRole } from './enums/ClientRole';
import { GameStatus } from './enums/GameStatus';

export const LoginForm = (props: LoginFormContentInterface): JSX.Element => {
    return <>
        <Header
            menuItems={[]}
            currentMode={AppMode.Login}
            currentRole={ClientRole.Undefined}
            status={GameStatus.UNDEFINED}
            title={'Please login to a game'}
            changeModeAction={(): void => {
            }}
        />
        <MainView>
            <LoginFormContent {...props} />
        </MainView>
    </>
}