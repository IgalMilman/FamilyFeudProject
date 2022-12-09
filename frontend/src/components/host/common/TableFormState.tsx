export enum TableFormScreenState {
    Table, Form
}

export class ScreenState<T> {
    constructor(state: TableFormScreenState = TableFormScreenState.Table, data: T = null) {
        this.state = state;
        this.data = data;
    }
    state: TableFormScreenState;
    data: T;
}