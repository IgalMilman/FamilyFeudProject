import * as React from 'react'
import AppMode from '../enums/AppModes'
import { MainView } from './common/MainView';
import { BrowseQuestionScreen } from './host/BrowseQuestionsScreen';
import { CreateGameScreen } from './host/CreateGameScreen';
import { CreateQuestionScreen } from './host/CreateQuestionScreen';
import { SelectGameScreen } from './host/SelectGameScreen';

interface HostSettingsContent {
    mode: AppMode;
}

export function HostSettingsContent(props: HostSettingsContent): JSX.Element {
    let mainElement = undefined;
    switch (props.mode) {
        case AppMode.GameCreation:
            mainElement = <CreateGameScreen />
            break;
        case AppMode.GameSelection:
            mainElement = <SelectGameScreen />
            break;
        case AppMode.BrowseQuestions:
            mainElement = <BrowseQuestionScreen />
            break;
        default:
            mainElement = <CreateQuestionScreen />
    }
    return (
        <MainView>
            {mainElement}
        </MainView>
    )
}