import { Answer } from "./Answer";
import { QuestionData } from "./QuestionData";

export class Question {
  id: string;
  is_shown: boolean;
  is_complete: boolean;
  question_data: QuestionData;
  order: number;
  real_answers: Answer[];
}
