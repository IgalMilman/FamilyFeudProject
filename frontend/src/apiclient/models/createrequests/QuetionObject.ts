import { QuestionType } from "../../../enums/QuestionType";
import { AnswerObject } from "./AnswerObject";
import { MultiTextCreationObject } from "./MultiTextCreationObject";

export class QuestionObject {
  constructor() {
    this.text = [];
    this.answers = [];
  }

  qtype: 1 | 2 | 3;
  text: MultiTextCreationObject[];
  answers: AnswerObject[];

  public scaleAnswerCount(newCount: number): void {
    if (!this.answers) {
      this.answers = [];
    }
    if (newCount > this.answers.length) {
      for (let i = this.answers.length; i < newCount; i++) {
        this.answers.push(new AnswerObject(this.getAnswerLanguageCount()));
      }
    } else {
      for (let i = this.answers.length; i > newCount; i--) {
        this.answers.pop();
      }
    }
  }

  public scaleLanguageCount(newCount: number): void {
    if (!this.text) {
      this.text = [];
    }
    if (newCount > this.text.length) {
      for (let i = this.text.length; i < newCount; i++) {
        const multiText: MultiTextCreationObject = new MultiTextCreationObject();
        multiText.text = '';
        multiText.sort_order = i;
        this.text.push(multiText);
      }
    } else {
      for (let i = this.text.length; i > newCount; i--) {
        this.text.pop();
      }
    }
    if ((this.qtype == QuestionType.FamilyFeud) || (this.qtype == QuestionType.FirstButton)) {
      for(const answer of this.answers) {
        answer.scaleLanguageCount(newCount);
      }
    }
  }

  public changeQuestionType(newType: QuestionType): void {
    if (newType == this.qtype) {
      return;
    }
    this.qtype = newType;
    this.answers = [new AnswerObject(this.getAnswerLanguageCount())];
  }

  private getAnswerLanguageCount(): number {
    return this.qtype == QuestionType.NumberEnter ? -1 : this.text?.length;
  }
}
