import { Injectable } from "@angular/core";
import { FullPlayer } from "../models/Player";

@Injectable({
  providedIn: "root",
})
export class BowlingStateService {
  constructor() {}
  BowlingState: FullPlayer[];
  FrameNumber = 0;
  PlayerNumber = 0;
  NumberOfPlayers: number;
  CurrentPlayer = 0;
  lastRound = false;

  setBowlers(players: FullPlayer[]): void {
    this.BowlingState = players;
    this.NumberOfPlayers = players.length;
  }

  getBowlers(): FullPlayer[] {
    return this.BowlingState;
  }

  nextPlayer(): void {
    if (this.CurrentPlayer + 1 >= this.NumberOfPlayers) {
      this.CurrentPlayer = 0;
      this.FrameNumber++;
      if (this.FrameNumber >= 10) {
        this.endGame();
      }
    } else {
      this.CurrentPlayer = this.CurrentPlayer + 1;
    }
  }

  throw(pins: number, ballNumber: number): void {
    if (pins === 10) {
      ballNumber = 1;
    }
    this.BowlingState[this.CurrentPlayer].frameScore[this.FrameNumber][
      ballNumber
    ] = pins;
    this.calcTotalScore(pins);
    if (pins === 10 || ballNumber === 1) {
      this.nextPlayer();
    }
    console.log(this.BowlingState);
  }

  calcTotalScore(pins: number): void {
    this.BowlingState[this.CurrentPlayer].RoundScore[this.FrameNumber] += pins;
    this.BowlingState[this.CurrentPlayer].totalMatchScore += pins;
  }

  endGame(): void {
    console.log("game over");
  }
}
