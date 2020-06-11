//Model of what a players state will look like at any given point during a round
export class FullPlayer {
  name: string;
  totalMatchScore: number;
  roundScore: number[];
  frameScore: number[][];
  gamesWon: number;
  spare: boolean;
  strike: boolean;
  doubleStrike: boolean;
}
