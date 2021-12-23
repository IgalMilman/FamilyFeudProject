import { Game } from '../../apiclient/models/Game';
import AppMode from '../../enums/AppModes';
import { BaseAppProps } from './AppProps';

export interface MainGameContentProps extends BaseAppProps {
    game: Game;
    changeAppMode?: (newMode:AppMode) => void;
}
