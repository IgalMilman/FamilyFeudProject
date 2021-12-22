export enum GameStatus {
    UNDEFINED = 'un',
    BEGINNING = 'beg',
    SETTING_TEAMS = 'st',
    DASHBOARD = 'dash',
    QUESTION = 'ques',
    ENDING = 'end'
}

export function GameStatusFromString(input: string): GameStatus {
    switch(input) {
        case GameStatus.BEGINNING:
            return GameStatus.BEGINNING
        case GameStatus.SETTING_TEAMS:
            return GameStatus.SETTING_TEAMS
        case GameStatus.DASHBOARD:
            return GameStatus.DASHBOARD
        case GameStatus.QUESTION:
            return GameStatus.QUESTION
        case GameStatus.ENDING:
            return GameStatus.ENDING

    }
    return GameStatus.BEGINNING;
}
