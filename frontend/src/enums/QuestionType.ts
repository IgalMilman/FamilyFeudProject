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
