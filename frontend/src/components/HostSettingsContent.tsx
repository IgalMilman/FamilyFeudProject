import * as React from 'react'
import AppMode from '../enums/AppModes'
import { AutoScaleMaterialColumn } from './common/AutoScaleMaterialColumn';
import { MainView } from './common/MainView';
import { CreateGameForm } from './host/CreateGameForm';
import { CreateQuestionForm } from './host/CreateQuestionForm';
import { SelectGameForm } from './host/SelectGameForm';

interface HostSettingsContent {
    mode: AppMode;
}

export function HostSettingsContent(props: HostSettingsContent): JSX.Element {
    let mainElement = undefined;
    switch (props.mode) {
        case AppMode.GameCreation:
            mainElement = <CreateGameForm/>
            break;
        case AppMode.GameSelection:
            mainElement = <SelectGameForm/>
            break;
        default:
            mainElement = <CreateQuestionForm/>
    }
    return (
        <MainView>
            {mainElement}
        </MainView>
    )
}