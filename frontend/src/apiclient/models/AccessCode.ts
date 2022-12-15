import { Player } from "./Player";

export class AccessCode {
    id: number;
    is_disabled: boolean;
    access_code: string;
    is_shown: boolean;
    user: Player;
}
