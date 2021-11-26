import { Game } from '../../apiclient/models/Game';
import { BaseAppProps } from './AppProps';

export interface MainGameContentProps extends BaseAppProps {
    game: Game;
}
