class SurveyQuestionAnswer {
  id: string;
  answer: string | number;
  question_id: string;
}

export class SurveyAnswer {
  id: string;
  created_by: number;
  game: string;
  answers: { [key: string]: SurveyQuestionAnswer };
}
