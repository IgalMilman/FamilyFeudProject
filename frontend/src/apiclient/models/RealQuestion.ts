import { RealAnswer } from "./RealAnswer";
import { QuestionData } from "./QuestionData";

export class RealQuestion {
  id: string;
  is_shown: boolean;
  is_complete: boolean;
  question_data: QuestionData;
  order: number;
  real_answers: RealAnswer[];
  start: number;
}
