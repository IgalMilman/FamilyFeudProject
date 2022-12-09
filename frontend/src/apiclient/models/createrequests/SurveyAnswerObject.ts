import { NoEmitOnErrorsPlugin } from "webpack";
import { SurveyQuestionIsNumeric } from "../../../enums/SurveyQuestionType";
import { Survey } from "../survey/Survey";
import { SurveyAnswer } from "../survey/SurveyAnswer";
  
class SurveyQuestionAnswerObject {
  constructor(answer: string | number, id: string=undefined) {
    this.id = id;
    this.answer = answer;
  }
  id: string;
  answer: string | number;
}

export class SurveyAnswerObject {
  private constructor() {
    this.answers = {};
  }
  private answers: {[key:string]: SurveyQuestionAnswerObject};

  public setAnswer(key: string, answer: string | number): void {
    if (key in this.answers) {
      this.answers[key].answer = answer;
    } else {
      this.answers[key] = new SurveyQuestionAnswerObject(answer);
    }
  }

  public getAnswer(key: string): string | number {
    return this.answers[key]?.answer;
  }

  public static forSurvey(survey:Survey): SurveyAnswerObject {
    const result: SurveyAnswerObject = new SurveyAnswerObject();
    if (survey.questions) {
      for(const question of survey.questions) {
        result.setAnswer(question.id, SurveyQuestionIsNumeric(question.qtype) ? 0 : '');
      }
    }
    return result;
  }

  public static fromSurveyAnswer(surveyAnswer: SurveyAnswer): SurveyAnswerObject {
    return null;
  }
}
