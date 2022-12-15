export enum SurveyQuestionType {
  NumberEntry = 1,
  OneLineTextEntry = 2,
  MultilineTextEntry = 3,
  NumberChoice = 4,
  PlayerChoice = 5,
}

export const ALL_QUESTION_TYPE_VALUES: number[] = [1, 2, 3, 4, 5];

export function SurveyQuestionTypeFromNumber(
  input?: number
): SurveyQuestionType {
  switch (input) {
    case 1:
      return SurveyQuestionType.NumberEntry;
    case 2:
      return SurveyQuestionType.OneLineTextEntry;
    case 3:
      return SurveyQuestionType.MultilineTextEntry;
    case 4:
      return SurveyQuestionType.NumberChoice;
    case 5:
      return SurveyQuestionType.PlayerChoice;
  }
  return null;
}

const SurveyQuestionTypeNumberToTextMap: { [key: number]: string } = {
  1: "Number entry",
  2: "One line answer",
  3: "Multi line answer",
  4: "Number choice answer",
  5: "Player choice answer"
};

export function SurveyQuestionTextFromNumber(input?: number): string {
  return SurveyQuestionTypeNumberToTextMap[input] || null;
}

export function SurveyQuestionIsNumeric(input: number): boolean {
  return input == 1 || input == 4;
}
