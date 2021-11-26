import { AnswerData } from "./AnswerData";
import { MultiLanguage } from "./MultiLanguage";

export class QuestionData extends MultiLanguage {
  answers: AnswerData[];
  qtype: number;
  has_real: boolean;
}
