import { MultiTextCreationObject } from "./MultiTextCreationObject";

export class AnswerObject {
  constructor(countOfLanguages: number = 0) {
    this.text = countOfLanguages < 0 ? undefined : [];
    this.points_value = 0;
    this.people_answered = 0;
    for (let i = 0; i < countOfLanguages; i++) {
        const multiText: MultiTextCreationObject = new MultiTextCreationObject();
        multiText.text = '';
        multiText.sort_order = i;
        this.text.push(multiText);
    }
  }

  text: MultiTextCreationObject[];
  points_value?: number;
  people_answered?: number;
  correct_value?: number;

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
  }
}
