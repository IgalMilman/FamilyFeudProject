export enum GameStatus {
    UNDEFINED = 'un',
    BEGINNING = 'beg',
    SETTING_TEAMS = 'st',
    CHOOSING_TEAMS = 'ct',
    DASHBOARD = 'dash',
    QUESTION = 'ques',
    PLACING_BETS = 'bet',
    SURVEY = 'surv',
    ENDING = 'end'
}

export function GameStatusFromString(input: string): GameStatus {
    switch(input) {
        case GameStatus.BEGINNING:
            return GameStatus.BEGINNING;
        case GameStatus.SETTING_TEAMS:
            return GameStatus.SETTING_TEAMS;
        case GameStatus.CHOOSING_TEAMS:
            return GameStatus.CHOOSING_TEAMS;
        case GameStatus.DASHBOARD:
            return GameStatus.DASHBOARD;
        case GameStatus.QUESTION:
            return GameStatus.QUESTION;
        case GameStatus.PLACING_BETS:
            return GameStatus.PLACING_BETS;
        case GameStatus.SURVEY:
            return GameStatus.SURVEY;
        case GameStatus.ENDING:
            return GameStatus.ENDING;
    }
    return GameStatus.BEGINNING;
}
