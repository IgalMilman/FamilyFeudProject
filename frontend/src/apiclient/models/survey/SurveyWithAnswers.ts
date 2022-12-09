import { Survey } from "./Survey";
import { SurveyAnswer } from "./SurveyAnswer";

export class SurveyWithAnswers extends Survey {
    answers: SurveyAnswer[];
}