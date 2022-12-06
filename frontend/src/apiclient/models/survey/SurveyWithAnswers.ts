import { SurveyQuestion } from "./SurveyQuestion";
import { Survey } from "./Survey";

export class SurveyWithAnswers extends Survey {
    questions: SurveyQuestion[];
}