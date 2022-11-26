export class MultiTextCreationObject {
  constructor(sort_order: number = 0, text: string = "") {
    this.text = text;
    this.sort_order = sort_order;
  }

  text: string;
  sort_order: number;

  public static fromTextArray(text: string[]): MultiTextCreationObject[] {
    if (text && text.length > 0)
      return text.map(
        (value, index) => new MultiTextCreationObject(index, value)
      );
    return [];
  }
}
