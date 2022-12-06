import { SurveyQuestionIsNumeric } from "../../../enums/SurveyQuestionType";
import { Survey } from "../survey/Survey";
import { SurveyAnswer } from "../survey/SurveyAnswer";
  
  export class SurveyAnswerObject {
    private constructor() {
      this.answers = {};
    }
    answers: {[key:string]: string|number};

    public static forSurvey(survey:Survey): SurveyAnswerObject {
      const result: SurveyAnswerObject = new SurveyAnswerObject();
      if (survey.questions) {
        for(const question of survey.questions) {
          result.answers[question.id] = SurveyQuestionIsNumeric(question.qtype) ? 0 : '';
        }
      }
      return result;
    }

    public static fromSurveyAnswer(surveyAnswer: SurveyAnswer): SurveyAnswerObject {
      return null;
    }
  }
  