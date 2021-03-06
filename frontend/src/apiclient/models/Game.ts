import { GameStatus } from "../../enums/GameStatus";
import { Question } from "./Question";
import { Team } from "./Team";

export class Game {
  id: string;
  started: string;
  status: string;
  title?: string;
  viewer_access_code?: string;
  gameStatus: GameStatus;
  current_question: string;
  active_question: Question;
  teams: Team[];
}
