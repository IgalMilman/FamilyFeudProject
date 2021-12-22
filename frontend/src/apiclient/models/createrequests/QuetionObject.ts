import { AnswerObject } from "./AnswerObject";
import { MultiTextCreationObject } from "./MultiTextCreationObject";

export class QuestionObject {
  qtype: 1 | 2 | 3;
  text: MultiTextCreationObject[];
  answers: AnswerObject[];
}
