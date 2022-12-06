import { Survey } from "../survey/Survey";
import { MultiTextCreationObject } from "./MultiTextCreationObject";
import { SurveyQuestionObject } from "./SurveyQuestionObject";

export class SurveyObject {
  constructor(countOfLanguages: number = 1) {
    this.title = [];
    this.questions = [];
    this.id = undefined;
    for (let i = 0; i < countOfLanguages; i++) {
      this.title.push(new MultiTextCreationObject(i));
    }
  }

  id: string | undefined;
  title: MultiTextCreationObject[];
  questions: SurveyQuestionObject[];

  public scaleAnswerCount(newCount: number): void {
    if (!this.questions) {
      this.questions = [];
    }
    if (newCount > this.questions.length) {
      for (let i = this.questions.length; i < newCount; i++) {
        this.questions.push(new SurveyQuestionObject(this.getLanguageCount()));
      }
    } else {
      for (let i = this.questions.length; i > newCount; i--) {
        this.questions.pop();
      }
    }
  }

  public scaleLanguageCount(newCount: number): void {
    if (!this.title) {
      this.title = [];
    }
    if (newCount > this.title.length) {
      for (let i = this.title.length; i < newCount; i++) {
        const multiText: MultiTextCreationObject = new MultiTextCreationObject(
          i
        );
        this.title.push(multiText);
      }
    } else {
      for (let i = this.title.length; i > newCount; i--) {
        this.title.pop();
      }
    }
    for (const question of this.questions) {
      question.scaleLanguageCount(newCount);
    }
  }

  private getLanguageCount(): number {
    return this.title?.length;
  }

  public static fromSurvey(survey: Survey): SurveyObject {
    const result: SurveyObject = new SurveyObject();
    result.id = survey.id;
    result.title = MultiTextCreationObject.fromTextArray(survey.title);
    if (survey.questions) {
      result.questions = survey.questions.map((question) =>
        SurveyQuestionObject.fromSurveyQuestion(question)
      );
    }
    return result;
  }
}
