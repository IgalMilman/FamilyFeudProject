export enum QuestionType {
  NumberEnter = 1,
  FirstButton = 2,
  FamilyFeud = 3,
}

export function QuestionTypeFromNumber(input?: number): QuestionType {
  switch (input) {
    case 1:
      return QuestionType.NumberEnter;
    case 2:
      return QuestionType.FirstButton;
    case 3:
      return QuestionType.FamilyFeud;
  }
  return null;
}

export function QuestionTextFromNumber(input?: number): string {
  switch (input) {
    case 1:
      return "Number";
    case 2:
      return "Button";
    case 3:
      return "Fam Feud";
  }
  return null;
}
