type AvailableUrlParameters =
  | "game_id"
  | "survey_id"
  | "answer_id"
  | "question_id";

export const GENERIC_URL_MAP_GAME_ENDPOINTS: {
  [key: string]: (value: { [vkey: string]: string }) => string;
} = {
  api_available_games: () => "/api/game/all",
  api_create_game: () => "/api/game/create",
  api_game_current: () => "/api/game/current",
  api_game: (value) => `/api/game/${value["game_id"]}`,
  api_question_reveal: (value) =>
    `/api/game/${value["game_id"]}/question/${value["question_id"]}/reveal`,
  api_question_complete: (value) =>
    `/api/game/${value["game_id"]}/question/${value["question_id"]}/complete`,
  api_question_answer: (value) =>
    `/api/game/${value["game_id"]}/question/${value["question_id"]}/answer`,
  api_question_get_all: (value) =>
    `/api/game/${value["game_id"]}/question/all/`,
  api_question_get_all_type: (value) =>
    `/api/game/${value["game_id"]}/question/all/`,
  api_answer_reveal: (value) =>
    `/api/game/${value["game_id"]}/answer/${value["answer_id"]}/reveal`,
  api_team_name_change: (value) => `/api/game/${value["game_id"]}/team/name`,
};

export const GENERIC_URL_MAP_QUESTION_ENDPOINTS: {
  [key: string]: (value: { [vkey: string]: string }) => string;
} = {
  api_all_questions: () => "/api/question/all",
  api_question: (value) => `/api/question/${value["question_id"]}`,
  api_upsert_question: () => "/api/question/upsert",
};

export const GENERIC_URL_MAP_USER_ENDPOINTS: {
  [key: string]: (value: { [vkey: string]: string }) => string;
} = {
  api_logout: () => `/logout`,
  api_get_user_listing: (value) => `/api/game/${value["game_id"]}/users`,
};

export const GENERIC_URL_MAP_SURVEY_ENDPOINTS: {
  [key: string]: (value: { [vkey: string]: string }) => string;
} = {
  api_get_survey: (value) => `/api/survey/${value["survey_id"]}`,
  api_get_survey_for_game: (value) =>
    `/api/game/${value["game_id"]}/survey/${value["survey_id"]}`,
  api_get_all_surveys: (value) => `/api/survey/all`,
  api_get_survey_for_game_with_answers: (value) =>
    `/api/game/${value["game_id"]}/survey/${value["survey_id"]}/answers`,
  api_upsert_survey: (value) => `/api/survey/upsert`,
  api_upsert_answer_to_survey: (value) =>
    `api/game/${value["game_id"]}/survey/${value["survey_id"]}/answer/upsert`,
};
