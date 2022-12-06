import {
  SurveyQuestionType,
  SurveyQuestionTypeFromNumber,
} from "../../../enums/SurveyQuestionType";
import {
  SurveyQuestion,
  SurveyQuestionParameters,
} from "../survey/SurveyQuestion";
import { MultiTextCreationObject } from "./MultiTextCreationObject";

export class SurveyQuestionObject {
  constructor(countOfLanguages: number = 1) {
    this.text = [];
    this.parameters = new SurveyQuestionParameters();
    this.id = undefined;
    for (let i = 0; i < countOfLanguages; i++) {
      this.text.push(new MultiTextCreationObject(i));
    }
  }

  id: string | undefined;
  qtype: 1 | 2 | 3 | 4 | 5;
  text: MultiTextCreationObject[];
  parameters: SurveyQuestionParameters;

  public scaleLanguageCount(newCount: number): void {
    if (!this.text) {
      this.text = [];
    }
    if (newCount > this.text.length) {
      for (let i = this.text.length; i < newCount; i++) {
        const multiText: MultiTextCreationObject = new MultiTextCreationObject(
          i
        );
        this.text.push(multiText);
      }
    } else {
      for (let i = this.text.length; i > newCount; i--) {
        this.text.pop();
      }
    }
  }

  public changeQuestionType(newType: SurveyQuestionType): void {
    if (newType == this.qtype) {
      return;
    }
    this.qtype = newType;
  }

  public static fromSurveyQuestion(
    surveyQuestion: SurveyQuestion
  ): SurveyQuestionObject {
    const result: SurveyQuestionObject = new SurveyQuestionObject();
    result.id = surveyQuestion.id;
    result.changeQuestionType(
      SurveyQuestionTypeFromNumber(surveyQuestion.qtype)
    );
    result.text = MultiTextCreationObject.fromTextArray(surveyQuestion.text);
    return result;
  }
}
