import * as React from 'react'
import { MainView } from './components/common/MainView';
import Header from './components/Header'
import { UsernameLoginForm, UsernameLoginFormProps } from './components/UserDataFormContent';
import AppMode from './enums/AppModes';
import { ClientRole } from './enums/ClientRole';
import { GameStatus } from './enums/GameStatus';

export const UserDataForm = (props: UsernameLoginFormProps): JSX.Element => {
    return <>
        <Header
            menuItems={[]}
            currentMode={AppMode.UserDataFillIn}
            currentRole={ClientRole.Undefined}
            realRole={ClientRole.Undefined}
            status={GameStatus.UNDEFINED}
            title={'Please fill in your information'}
            changeModeAction={(): void => {
            }}
        />
        <MainView>
            <UsernameLoginForm {...props} />
        </MainView>
    </>
}