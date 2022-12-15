export class Player{
    id: number;
    first_name?: string;
    last_name?: string;
    team?: number;
    active?: boolean;
    is_default?: boolean;
}

export class PlayerListing {
    teams: {[key: number]: Player[]};
    self: Player;
}

export class PlayerByTeamAllocation {
    self: Player;
    my: Player[] = [];
    opposing: Player[] = [];
    all: Player[] = [];
}