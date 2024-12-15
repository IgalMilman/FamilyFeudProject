export enum QuestionType {
  NumberEnter = 1,
  FirstButton = 2,
  FamilyFeud = 3,
  OpenQuestion = 4,
}

export const ALL_QUESTION_TYPE_VALUES: number[] = [1, 2, 3, 4];

export function QuestionTypeFromNumber(input?: number): QuestionType {
  switch (input) {
    case 1:
      return QuestionType.NumberEnter;
    case 2:
      return QuestionType.FirstButton;
    case 3:
      return QuestionType.FamilyFeud;
    case 4:
      return QuestionType.OpenQuestion;
  }
  return null;
}

export const QuestionTypeNumberToTextMap: {[key: number]: string} = {
  1: "Number",
  2: "Button",
  3: "Fam Feud",
  4: "Open Question",
}

export function QuestionTextFromNumber(input?: number): string {
  return QuestionTypeNumberToTextMap[input] || null;
}
