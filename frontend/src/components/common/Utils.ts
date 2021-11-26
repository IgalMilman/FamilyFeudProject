import { Game } from "../../apiclient/models/Game";
import { Team } from "../../apiclient/models/Team";

export function getTeam(game:Game, teamnumber:1|2): Team {
    return game?.teams?.find((team)=>team.number == teamnumber);
}