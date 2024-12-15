export class PlacedBet {
  id: String;
  bet: String;
  is_shown: Boolean;
  assigned: -1 | 0 | 1;
  team: 1 | 2 | undefined;
  size: number;
}
