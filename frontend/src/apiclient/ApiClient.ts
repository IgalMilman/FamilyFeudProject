import { ClientRole } from "../enums/ClientRole";
import { Answer } from "./models/Answer";
import { Game } from "./models/Game";
import { GameAction } from "./models/GameAction";
import { GiveAnswer } from "./models/GiveAnswer";
import { Question } from "./models/Question";
import { QuestionData } from "./models/QuestionData";
import { TeamNameChangeRequest } from "./models/TeamNameChange";

export class ApiClient {
  static client: ApiClient;

  role: ClientRole;
  game: Game;
  urlMap: { [key: string]: (props: any) => string } = {
    api_game_current: () => "api/game/current",
    api_game: (game_id: string) => `api/game/${game_id}`,
    api_question: (question_id: string) => `api/question/${question_id}`,
    api_question_reveal: (question_id: string) =>
      `api/question/${question_id}/reveal`,
    api_question_complete: (question_id: string) =>
      `api/question/${question_id}/complete`,
    api_question_answer: (question_id: string) =>
      `api/question/${question_id}/answer`,
    api_question_get_all: (game_id: string) => `api/question/all/${game_id}`,
    api_question_get_all_type: (game_id: string) =>
      `api/question/all/${game_id}/`,
    api_answer_reveal: (answer_id) => `api/answer/${answer_id}/reveal`,
    api_team_name_change: (team_number) => `api/team/${team_number}/name`,
  };

  constructor(role: ClientRole) {
    this.role = role;
  }

  public async getGameStatus(): Promise<Game> {
    const response = await fetch(this.generateUrl("api_game_current"), {
      method: "GET",
      headers: {
        "content-type": "application/jsonobject;charset=UTF-8",
      },
    });
    const jsonobject = await response.json();
    this.game = Object.assign(new Game(), jsonobject);
    return this.game;
  }

  public async revealQuestion(question_id: string): Promise<boolean> {
    const url: string = this.generateUrl("api_question_reveal", question_id);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/jsonobject;charset=UTF-8",
      },
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
      headers: {
        "content-type": "application/jsonobject;charset=UTF-8",
      },
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
      headers: {
        "content-type": "application/jsonobject;charset=UTF-8",
      },
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
      headers: {
        "content-type": "application/jsonobject;charset=UTF-8",
      },
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

  public async submitAnswer(
    question_id: string,
    answer: GiveAnswer
  ): Promise<Answer> {
    const url: string = this.generateUrl("api_question_answer", question_id);
    answer.teamid = this.getTeamId(answer.teamnumber);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/jsonobject;charset=UTF-8",
      },
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
  ): Promise<Answer> {
    const url: string = this.generateUrl("api_team_name_change", teamnumber.toString());
    request.game_id = this.game?.id;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/jsonobject;charset=UTF-8",
      },
      body: JSON.stringify(request),
    });
    if (response.status != 200) {
      console.log(`Could not put data. ${response.body}`);
      return null;
    }
    const jsonobject = await response.json();
    return Object.assign(new Answer(), jsonobject["answer"]);
  }

  public async revealAnswer(answer_id: string): Promise<Answer> {
    const url: string = this.generateUrl("api_answer_reveal", answer_id);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/jsonobject;charset=UTF-8",
      },
    });
    if (response.status != 200) {
      console.log(`Could not fetch data. ${response.body}`);
      return null;
    }
    const jsonobject = await response.json();
    return Object.assign(new Answer(), jsonobject["answer"]);
  }

  public async performActionOnGame(
    game_id: string,
    message: GameAction
  ): Promise<boolean> {
    const url: string = this.generateUrl("api_game", game_id);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/jsonobject;charset=UTF-8",
      },
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
    const result = this.urlMap[urlname](id) + `?role=${this.role}`;
    return result;
  }

  public static getClient(role: ClientRole | undefined): ApiClient {
    if (ApiClient.client) {
      return ApiClient.client;
    } else {
      const client = new ApiClient(role);
      ApiClient.client = client;
      return client;
    }
  }
}
