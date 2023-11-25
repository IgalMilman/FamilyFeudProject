import { SurveyWithAnswers } from "../survey/SurveyWithAnswers";
  
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

  public static forSurvey(survey:SurveyWithAnswers): SurveyAnswerObject {
    if (!survey) {
      return null;
    }
    const answer = (survey.answers && (survey.answers.length > 0))? survey.answers[0].answers : {};
    const result: SurveyAnswerObject = new SurveyAnswerObject();
    if (survey.questions) {
      for(const question of survey.questions) {
        result.setAnswer(question.id, answer[question.id]?.answer??null);
      }
    }
    return result;
  }
}
