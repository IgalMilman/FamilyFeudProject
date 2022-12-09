import { GameStatus } from "../../enums/GameStatus";

export class GameAction {
  action: "next_question" | "set_survey" | "set_status";
  questionid: string;
  survey_id: string;
  status: GameStatus;
}
