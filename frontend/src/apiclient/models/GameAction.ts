import { GameStatus } from "../../enums/GameStatus";

export class GameAction{
    action:"next_question"|"set_status";
    questionid: string;
    status: GameStatus;
}