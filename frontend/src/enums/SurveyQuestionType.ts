export enum SurveyQuestionType {
  OneLineTextEntry = 1,
  MultilineTextEntry = 2,
  PlayerChoice = 3,
  NumberChoice = 4,
  NumberEntry = 5,
}

export const ALL_QUESTION_TYPE_VALUES: number[] = [1, 2, 3, 4, 5];

export function SurveyQuestionTypeFromNumber(
  input?: number
): SurveyQuestionType {
  switch (input) {
    case 1:
      return SurveyQuestionType.OneLineTextEntry;
    case 2:
      return SurveyQuestionType.MultilineTextEntry;
    case 3:
      return SurveyQuestionType.PlayerChoice;
    case 4:
      return SurveyQuestionType.NumberChoice;
    case 5:
      return SurveyQuestionType.NumberEntry;
  }
  return null;
}

const SurveyQuestionTypeNumberToTextMap: { [key: number]: string } = {
  1: "Number",
  2: "Button",
  3: "Fam Feud",
};

export function SurveyQuestionTextFromNumber(input?: number): string {
  return SurveyQuestionTypeNumberToTextMap[input] || null;
}

export function SurveyQuestionIsNumeric(input: number): boolean {
  return input == 4 || input == 5;
}
