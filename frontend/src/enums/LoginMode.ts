export enum LoginMode {
    ACCESS_CODE_LOGIN = 'ac',
    USER_LOGIN = 'us'
}

export function getLoginModeFromString(input: string): LoginMode {
    return input == LoginMode.USER_LOGIN ? LoginMode.USER_LOGIN : LoginMode.ACCESS_CODE_LOGIN
}