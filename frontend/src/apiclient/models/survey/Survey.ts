import { SurveyQuestion } from "./SurveyQuestion";
import { SurveySummary } from "./SurveySummary";

export class Survey extends SurveySummary {
    questions: SurveyQuestion[];
}