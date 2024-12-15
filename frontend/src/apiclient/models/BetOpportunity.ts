import { PlacedBet } from "./PlacedBet";

export class BetOpportunity {
    id: string;
    is_shown: Boolean;
    question: string;
    bets?: PlacedBet[];
}