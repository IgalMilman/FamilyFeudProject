import { GameStatus } from "../../enums/GameStatus";
import { BetOpportunity } from "./BetOpportunity";
import { RealQuestion } from "./RealQuestion";
import { Team } from "./Team";

export class Game {
  id: string;
  started: string;
  status: string;
  title?: string;
  viewer_access_code?: string;
  gameStatus: GameStatus;
  current_question: string;
  current_survey: string;
  current_bet: string;
  active_question: RealQuestion;
  active_bet: BetOpportunity;
  is_captain?: boolean;
  team_on?: 1 | 2;
  teams: Team[];
}
