import { ClientRole } from "../enums/ClientRole";
import { getCsrfToken } from "./CommonMethods";
import { Answer } from "./models/Answer";
import { APIResponse } from "./models/APIResponse";
import { CreateGameRequest } from "./models/CreateGameRequest";
import { QuestionObject } from "./models/createrequests/QuetionObject";
import { Game } from "./models/Game";
import { GameAction } from "./models/GameAction";
import { GameSelectionOption } from "./models/GameSelectionOption";
import { GiveAnswer } from "./models/GiveAnswer";
import { Question } from "./models/Question";
import { QuestionData } from "./models/QuestionData";
import { Team } from "./models/Team";
import { TeamNameChangeRequest } from "./models/TeamNameChange";

export class ApiClient {
  static client: ApiClient;

  role: ClientRole;
  game: Game;
  gameId: string;
  urlMap: { [key: string]: (game_id: string, props: string) => string } = {
    api_available_games: () => "/api/game/all",
    api_create_game: () => "/api/game/create",
    api_game_current: () => "/api/game/current",
    api_game: (game_id: string) => `/api/game/${game_id}`,
    api_question: (game_id: string, question_id: string) =>
      `/api/game/${game_id}/question/${question_id}`,
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
    api_create_question: () => "/api/question/create",
    api_logout: () => `/logout`,
  };

  constructor(role: ClientRole, gameId: string | undefined = undefined) {
    this.role = role;
    this.gameId = gameId;
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
    const responseobj: APIResponse<Game> = Object.assign(new APIResponse<Game>(), jsonobject);
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

  public async getQuestion(question_id: string): Promise<Question> {
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
    return Object.assign(new Question(), jsonobject);
  }

  public async getQuestionsList(game_id: string): Promise<QuestionData[]> {
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

  public async createQuestion(
    questionData: QuestionObject
  ): Promise<APIResponse<QuestionData>> {
    const response = await fetch(this.generateUrl("api_create_question"), {
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
    console.log(`Could not create a game. ${response.body}`);
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
  ): Promise<Answer> {
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
    return Object.assign(new Answer(), jsonobject["answer"]);
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

  public async revealAnswer(answerId: string): Promise<Answer> {
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
    return Object.assign(new Answer(), jsonobject["answer"]);
  }

  public async performActionOnGame(
    gameId: string,
    message: GameAction
  ): Promise<boolean> {
    const url: string = this.generateUrl("api_game", gameId);
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

  private getTeamId(teamNumber: 1 | 2 | undefined): string | undefined {
    if (teamNumber && this.game?.teams?.length >= teamNumber) {
      return this.game.teams[teamNumber - 1].id;
    }
    return undefined;
  }

  private generateUrl(urlname: string, id: string = ""): string {
    console.log(this.gameId);
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
