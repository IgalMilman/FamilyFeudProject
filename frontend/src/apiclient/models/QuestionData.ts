import { AnswerData } from "./AnswerData";
import { QuestionBase } from "./QuestionBase";

export class QuestionData extends QuestionBase {
  answers: AnswerData[];
  qtype: number;
  has_real: boolean;
  is_complete: boolean;
}
