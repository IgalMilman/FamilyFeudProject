import { AnswerData } from "./AnswerData";

export class Answer {
  id: string;
  is_shown: boolean;
  is_complete: boolean;
  team: undefined | null | 1 | 2;
  answerdata: AnswerData;
  value: number;
  add_points: number;
  created: number;
}
