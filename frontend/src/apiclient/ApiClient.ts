import { ClientRole } from "../enums/ClientRole";
import {
  Factory,
  getCsrfToken,
} from "./CommonMethods";
import { RealAnswer } from "./models/RealAnswer";
import { APIResponse } from "./models/APIResponse";
import { CreateGameRequest } from "./models/CreateGameRequest";
import { QuestionObject } from "./models/createrequests/QuetionObject";
import { Game } from "./models/Game";
import { GameAction } from "./models/GameAction";
import { GameSelectionOption } from "./models/GameSelectionOption";
import { GiveAnswer } from "./models/GiveAnswer";
import { QuestionData } from "./models/QuestionData";
import { Team } from "./models/Team";
import { TeamNameChangeRequest } from "./models/TeamNameChange";
import { QuestionType } from "../enums/QuestionType";
import { QuestionSummary } from "./models/QuestionSummary";
import { AnswerData } from "./models/AnswerData";
import {
  GENERIC_URL_MAP_GAME_ENDPOINTS,
  GENERIC_URL_MAP_QUESTION_ENDPOINTS,
  GENERIC_URL_MAP_SURVEY_ENDPOINTS,
  GENERIC_URL_MAP_USER_ENDPOINTS,
} from "./Endpoints";
import { Survey } from "./models/survey/Survey";
import { SurveySummary } from "./models/survey/SurveySummary";
import { SurveyObject } from "./models/createrequests/SurveyObject";
import { SurveyAnswerObject } from "./models/createrequests/SurveyAnswerObject";
import { SurveyAnswer } from "./models/survey/SurveyAnswer";
import { SurveyWithAnswers } from "./models/survey/SurveyWithAnswers";
import { PlayerListing } from "./models/Player";
import { AccessCode } from "./models/AccessCode";

declare global{
  var apiClient: any;
}

export class ApiClient {
  static client: ApiClient;

  role: ClientRole;
  game: Game;
  gameId: string;
  urlMapGeneric: {
    [key: string]: (value: { [vkey: string]: string }) => string;
  } = Object.assign(
    {},
    GENERIC_URL_MAP_GAME_ENDPOINTS,
    GENERIC_URL_MAP_QUESTION_ENDPOINTS,
    GENERIC_URL_MAP_USER_ENDPOINTS,
    GENERIC_URL_MAP_SURVEY_ENDPOINTS
  );
  urlMap: { [key: string]: (game_id: string, props: string) => string } = {
    api_available_games: () => "/api/game/all",
    api_create_game: () => "/api/game/create",
    api_game_current: () => "/api/game/current",
    api_all_games: () => "/api/question/all",
    api_game: (game_id: string) => `/api/game/${game_id}`,
    api_question_reveal: (game_id: string, question_id: string) =>
      `/api/game/${game_id}/question/${question_id}/reveal`,
    api_question_complete: (game_id: string, question_id: string) =>
      `/api/game/${game_id}/question/${question_id}/complete`,
    api_question_answer: (game_id: string, question_id: string) =>
      `/api/game/${game_id}/question/${question_id}/answer`,
    api_question_get_all: (game_id: string) =>
      `/api/game/${game_id}/question/all/`,
    api_question_get_all_type: (game_id: string) =>
      `/api/game/${game_id}/question/all/`,
    api_answer_reveal: (game_id: string, answer_id: string) =>
      `/api/game/${game_id}/answer/${answer_id}/reveal`,
    api_team_name_change: (game_id: string) => `/api/game/${game_id}/team/name`,
    api_question: (game_id: string, question_id: string) =>
      `/api/question/${question_id}`,
    api_upsert_question: () => "/api/question/upsert",
    api_logout: () => `/logout`,
  };

  constructor(role: ClientRole, gameId: string | undefined = undefined) {
    this.role = role;
    this.gameId = gameId;
    if (role == ClientRole.Host) {
      var apiClient:ApiClient = this;
      globalThis.apiClient = apiClient;
    }
  }

  public async getGameStatus(): Promise<Game> {
    const response = await fetch(this.generateUrl("api_game_current"), {
      method: "GET",
      headers: this.generateHeaders(),
    });
    const jsonobject = await response.json();
    this.game = Object.assign(new Game(), jsonobject);
    return this.game;
  }

  public async getGame(): Promise<Game> {
    const response = await fetch(this.generateUrl("api_game"), {
      method: "GET",
      headers: this.generateHeaders(),
    });
    const jsonobject = await response.json();
    const responseobj: APIResponse<Game> = Object.assign(
      new APIResponse<Game>(),
      jsonobject
    );
    if (response.status != 200) {
      return null;
    }
    this.game = responseobj.data;
    return this.game;
  }

  public async getAvailableGames(): Promise<
    APIResponse<GameSelectionOption[]>
  > {
    const response = await fetch(this.generateUrl("api_available_games"), {
      method: "GET",
      headers: this.generateHeaders(),
    });
    const jsonobject = await response.json();
    const result: APIResponse<GameSelectionOption[]> = Object.assign(
      new APIResponse<GameSelectionOption[]>(),
      jsonobject
    );
    return result;
  }

  public async revealQuestion(question_id: string): Promise<boolean> {
    const url: string = this.generateUrl("api_question_reveal", question_id);
    const response = await fetch(url, {
      method: "PUT",
      headers: this.generateHeaders(),
    });
    if (response.status != 200) {
      console.log(`Could not fetch data. ${response.body}`);
      return false;
    }
    const jsonobject = await response.json();
    return true;
  }

  public async completeQuestion(question_id: string): Promise<boolean> {
    const url: string = this.generateUrl("api_question_complete", question_id);
    const response = await fetch(url, {
      method: "PUT",
      headers: this.generateHeaders(),
    });
    if (response.status != 200) {
      console.log(`Could not fetch data. ${response.body}`);
      return false;
    }
    const jsonobject = await response.json();
    return true;
  }

  public async getQuestion(question_id: string): Promise<QuestionData> {
    const url: string = this.generateUrl("api_question", question_id);
    const response = await fetch(url, {
      method: "GET",
      headers: this.generateHeaders(),
    });
    if (response.status != 200) {
      console.log(`Could not fetch data. ${response.body}`);
      return null;
    }
    const jsonobject = await response.json();
    const questionObject: QuestionData = Object.assign(
      new QuestionData(),
      jsonobject
    );
    questionObject.answers = questionObject.answers?.map((value) => {
      const answer = Object.assign(new AnswerData(), value);
      return answer;
    });
    return questionObject;
  }

  public async getQuestionsForGameList(
    game_id: string
  ): Promise<QuestionData[]> {
    const url: string = this.generateUrl("api_question_get_all", game_id);
    const response = await fetch(url, {
      method: "GET",
      headers: this.generateHeaders(),
    });
    if (response.status != 200) {
      console.log(`Could not fetch data. ${response.body}`);
      return null;
    }
    const jsonobject: Array<{}> = await response.json();
    const result = jsonobject.map<QuestionData>((value) =>
      Object.assign(new QuestionData(), value)
    );
    return result;
  }

  public async getQuestionsList(
    questionTypes: QuestionType[]
  ): Promise<QuestionSummary[]> {
    const url: string =
      this.generateUrl("api_all_games") +
      this.generateGetParameters({ qt: questionTypes });
    const response = await fetch(url, {
      method: "GET",
      headers: this.generateHeaders(),
    });
    if (response.status != 200) {
      console.log(`Could not fetch data. ${response.body}`);
      return null;
    }
    const jsonobject: Array<{}> = await response.json();
    const result = jsonobject.map<QuestionSummary>((value) =>
      Object.assign(new QuestionSummary(), value)
    );
    return result;
  }

  public async createGame(
    request: CreateGameRequest
  ): Promise<APIResponse<GameSelectionOption>> {
    const response = await fetch(this.generateUrl("api_create_game"), {
      method: "PUT",
      headers: this.generateHeaders(),
      body: JSON.stringify(request),
    });
    if (
      response.status == 200 ||
      response.status == 403 ||
      response.status == 400
    ) {
      const jsonobject = await response.json();
      const result: APIResponse<GameSelectionOption> = Object.assign(
        new APIResponse<GameSelectionOption>(),
        jsonobject
      );
      return result;
    }
    console.log(`Could not create a game. ${response.body}`);
    return null;
  }

  public async upsertQuestion(
    questionData: QuestionObject
  ): Promise<APIResponse<QuestionData>> {
    const response = await fetch(this.generateUrl("api_upsert_question"), {
      method: "PUT",
      headers: this.generateHeaders(),
      body: JSON.stringify(questionData),
    });
    if (response.status == 200 || response.status == 403) {
      const jsonobject = await response.json();
      const result: APIResponse<QuestionData> = Object.assign(
        new APIResponse<QuestionData>(),
        jsonobject
      );
      return result;
    }
    console.log(`Could not create a question. ${response.body}`);
    return null;
  }

  public async logout(): Promise<Boolean> {
    const url: string = this.generateUrl("api_logout");
    const response = await fetch(url, {
      method: "GET",
      headers: this.generateHeaders(),
    });
    return response.status == 200;
  }

  public async submitAnswer(
    question_id: string,
    answer: GiveAnswer
  ): Promise<RealAnswer> {
    const url: string = this.generateUrl("api_question_answer", question_id);
    answer.teamid = this.getTeamId(answer.teamnumber);
    const response = await fetch(url, {
      method: "PUT",
      headers: this.generateHeaders(),
      body: JSON.stringify(answer),
    });
    if (response.status != 200) {
      console.log(`Could not fetch data. ${response.body}`);
      return null;
    }
    const jsonobject = await response.json();
    return Object.assign(new RealAnswer(), jsonobject["answer"]);
  }

  public async changeTeamName(
    request: TeamNameChangeRequest,
    teamnumber: 1 | 2
  ): Promise<APIResponse<Team>> {
    const url: string = this.generateUrl(
      "api_team_name_change",
      teamnumber.toString()
    );
    const response = await fetch(url, {
      method: "PUT",
      headers: this.generateHeaders(),
      body: JSON.stringify(request),
    });
    if (
      response.status == 200 ||
      response.status == 400 ||
      response.status == 403
    ) {
      const jsonobject = await response.json();
      return Object.assign(new APIResponse<Team>(), jsonobject);
    }
    console.log(`Could not put data. ${response.body}`);
    return null;
  }

  public async revealAnswer(answerId: string): Promise<RealAnswer> {
    const url: string = this.generateUrl("api_answer_reveal", answerId);
    const response = await fetch(url, {
      method: "PUT",
      headers: this.generateHeaders(),
    });
    if (response.status != 200) {
      console.log(`Could not fetch data. ${response.body}`);
      return null;
    }
    const jsonobject = await response.json();
    return Object.assign(new RealAnswer(), jsonobject["answer"]);
  }

  public async performActionOnGame(
    message: GameAction
  ): Promise<boolean> {
    const url: string = this.generateUrl("api_game", this.gameId);
    const response = await fetch(url, {
      method: "PUT",
      headers: this.generateHeaders(),
      body: JSON.stringify(message),
    });
    if (response.status != 200) {
      console.log(`Could not update game. ${response.body}`);
      return false;
    }
    return true;
  }

  public async getSurvey(surveyId: string): Promise<Survey> {
    const url: string = this.generateUrlGeneric("api_get_survey", {
      survey_id: surveyId,
    });
    return await this.sendGetRequestAndRecieveDataObject(
      url,
      new Factory<Survey>(Survey)
    );
  }

  public async getSurveyForGame(surveyId: string): Promise<Survey> {
    const url: string = this.generateUrlGeneric("api_get_survey_for_game", {
      survey_id: surveyId,
    });
    return await this.sendGetRequestAndRecieveDataObject(
      url,
      new Factory<Survey>(Survey)
    );
  }

  public async getSurveySummaries(): Promise<SurveySummary[]> {
    const url: string = this.generateUrlGeneric("api_get_all_surveys", {});
    return await this.sendGetRequestAndRecieveDataArray(
      url,
      new Factory<SurveySummary>(SurveySummary)
    );
  }

  public async getSurveyForGameWithAnswers(
    surveyId: string
  ): Promise<SurveyWithAnswers> {
    const url: string = this.generateUrlGeneric("api_get_survey_for_game_with_answers", {
      survey_id: surveyId
    });
    return await this.sendGetRequestAndRecieveDataObject(
      url,
      new Factory<SurveyWithAnswers>(SurveyWithAnswers)
    );
  }

  public async upsertSurvey(
    surveyData: SurveyObject
  ): Promise<APIResponse<Survey>> {
    const url: string = this.generateUrlGeneric("api_upsert_survey", {});
    return this.sendPutRequestAndReieveAnswer(url, surveyData);
  }

  public async upsertSurveyAnswerForGame(
    surveyId: string,
    surveyAnswerData: SurveyAnswerObject
  ): Promise<APIResponse<SurveyAnswer>> {
    const url: string = this.generateUrlGeneric("api_upsert_answer_to_survey", {
      survey_id: surveyId,
    });
    return this.sendPutRequestAndReieveAnswer(url, surveyAnswerData);
  }

  public async assignUserToTeam(
    userId: number,
    team: number,
  ):Promise<boolean> {
    const url: string = this.generateUrlGeneric("api_assign_user_to_team", {
      "user_id":userId.toString(),
      "team_id":team.toString(),
    });
    return this.sendGetRequest(url);
  }

  public async makeUserCaptain(
    userId: number,
  ): Promise<boolean> {
    const url: string = this.generateUrlGeneric("api_make_user_captain", {
      "user_id":userId.toString(),
    });
    return this.sendGetRequest(url);
  }

  public async deactivateUser(
    userId: number,
  ): Promise<boolean> {
    const url: string = this.generateUrlGeneric("api_deactivate_user", {
      "user_id":userId.toString(),
    });
    return this.sendGetRequest(url);
  }

  public async generatePlayers(
    number: number,
  ): Promise<AccessCode[]> {
    const url: string = this.generateUrlGeneric("api_generate_users_and_access_codes", {
      "number":number.toString(),
    });
    return this.sendGetRequestAndRecieveDataArray(url, new Factory<AccessCode>(AccessCode));    
  }

  public async getAvailableAccessCodes(): Promise<AccessCode[]> {
    const url: string = this.generateUrlGeneric("api_get_available_access_codes", {});
    return this.sendGetRequestAndRecieveDataArray(url, new Factory<AccessCode>(AccessCode));      
  }

  public async getAllAccessCodesAndUsers(): Promise<AccessCode[]> {
    const url: string = this.generateUrlGeneric("api_get_all_users_and_access_codes_for_game", {});
    return this.sendGetRequestAndRecieveDataArray(url, new Factory<AccessCode>(AccessCode));      
  }

  public async getPlayerListing(): Promise<PlayerListing> {
    const url: string = this.generateUrlGeneric("api_get_user_listing", {});
    return await this.sendGetRequestAndRecieveDataObject(
      url,
      new Factory<PlayerListing>(PlayerListing)
    );
  }

  private generateGetParameters(params: {
    [key: string]: string | number | string[] | number[];
  }): string {
    const result: string[] = [];
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const param = params[key];
        if (Array.isArray(param)) {
          for (const value of param) {
            result.push(`${key}=${value.toString()}`);
          }
        }
      }
    }
    if (result.length == 0) {
      return "";
    }
    return `?${result.join("&")}`;
  }

  private getTeamId(teamNumber: 1 | 2 | undefined): string | undefined {
    if (teamNumber && this.game?.teams?.length >= teamNumber) {
      return this.game.teams[teamNumber - 1].id;
    }
    return undefined;
  }

  private generateUrlGeneric(
    urlname: string,
    parameters: { [vkey: string]: string }
  ): string {
    if (!('game_id' in parameters)) {
      parameters['game_id'] = this.gameId;
    }
    const result = this.urlMapGeneric[urlname](parameters);
    return result;
  }

  private generateUrl(urlname: string, id: string = ""): string {
    const result = this.urlMap[urlname](this.gameId, id);
    return result;
  }

  private generateHeaders(): HeadersInit {
    return {
      "content-type": "application/jsonobject;charset=UTF-8",
      "X-CSRFToken": this.getCsrfToken(),
      UserRole: this.role,
    };
  }

  private getCsrfToken() {
    return getCsrfToken();
  }

  private async sendGetRequest(
    url: string
  ): Promise<boolean> {
    const response = await fetch(url, {
      method: "GET",
      headers: this.generateHeaders(),
    });
    if (response.status != 200) {
      console.log(`Could not fetch data. ${response.body}`);
      return false;
    }
    return true;
  }

  private async sendGetRequestAndRecieveDataObject<T>(
    url: string,
    factory: Factory<T>
  ): Promise<T> {
    const response = await fetch(url, {
      method: "GET",
      headers: this.generateHeaders(),
    });
    if (response.status != 200) {
      console.log(`Could not fetch data. ${response.body}`);
      return null;
    }
    const jsonobject = await response.json();
    const result: T = Object.assign(factory.getNew(), jsonobject);
    return result;
  }
  
  private async sendGetRequestAndRecieveDataArray<T>(
    url: string,
    factory: Factory<T>
  ): Promise<T[]> {
    const response = await fetch(url, {
      method: "GET",
      headers: this.generateHeaders(),
    });
    if (response.status != 200) {
      console.log(`Could not fetch data. ${response.body}`);
      return null;
    }
    const jsonobject: Array<{}> = await response.json();
    const result: T[] = jsonobject.map<T>((value) =>
      Object.assign(factory.getNew(), value)
    );
    return result;
  }
  
  private async sendPutRequestAndReieveAnswer<TInput, TOutput>(
    url: string,
    data: TInput
  ): Promise<APIResponse<TOutput>> {
    const response = await fetch(
      url,
      {
        method: "PUT",
        headers: this.generateHeaders(),
        body: JSON.stringify(data),
      }
    );
    if (response.status == 200 || response.status == 403) {
      const jsonobject = await response.json();
      const result: APIResponse<TOutput> = Object.assign(
        new APIResponse<TOutput>(),
        jsonobject
      );
      return result;
    }
    console.log(`Could not upsert data. ${response.body}`);
    return null;
  }
  

  public static getClient(): ApiClient {
    if (ApiClient.client) {
      return ApiClient.client;
    } else {
      const client = new ApiClient(ClientRole.Viewer);
      ApiClient.client = client;
      return client;
    }
  }

  public static getClientWithRole(role: ClientRole | undefined): ApiClient {
    if (ApiClient.client?.role == role) {
      return ApiClient.getClient();
    } else {
      const client = new ApiClient(role);
      ApiClient.client = client;
      return client;
    }
  }

  public static getClientWithRoleAndGame(
    role: ClientRole | undefined,
    gameId: string
  ): ApiClient {
    if (ApiClient.client?.role == role) {
      return ApiClient.getClient();
    } else {
      const client = new ApiClient(role, gameId);
      ApiClient.client = client;
      return client;
    }
  }
}
