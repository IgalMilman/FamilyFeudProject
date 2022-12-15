import AppMode from "../../enums/AppModes";
import { ClientRole } from "../../enums/ClientRole";
import { GameStatus } from "../../enums/GameStatus";

export interface BaseAppProps {
    currentMode: AppMode;
    currentRole: ClientRole;
    realRole: ClientRole;
    status: GameStatus;
    teamNumber?: 1 | 2 | undefined;
}