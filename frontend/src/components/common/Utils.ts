import { Game } from "../../apiclient/models/Game";
import { Team } from "../../apiclient/models/Team";

export function getTeam(game:Game, teamnumber:1|2): Team {
    return game?.teams?.find((team)=>team.number == teamnumber);
}

export function calculateDifferenceInTime(t1: number, t2: number): number {
    return Math.round(Math.abs(t1 - t2)*1000)/1000.0 
}