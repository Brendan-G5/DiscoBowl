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
    this.BowlingState[this.CurrentPlayer].frameScore[this.FrameNumber][
      ballNumber
    ] = pins;
    this.calcScores(pins, ballNumber);
    if (pins === 10 || ballNumber === 1) {
      this.nextPlayer();
    }
    console.log(this.BowlingState);
  }

  calcScores(pins: number, ballNumber: number): void {
    this.BowlingState[this.CurrentPlayer].roundScore[this.FrameNumber] += pins;
    if (this.BowlingState[this.CurrentPlayer].doubleStrike) {
      this.BowlingState[this.CurrentPlayer].roundScore[
        this.FrameNumber - 2
      ] += pins;
      if (ballNumber === 1) {
        this.BowlingState[this.CurrentPlayer].doubleStrike = false;
      }
    }
    if (this.BowlingState[this.CurrentPlayer].strike) {
      this.BowlingState[this.CurrentPlayer].roundScore[
        this.FrameNumber - 1
      ] += pins;
      if (ballNumber === 0 && pins === 10) {
        this.BowlingState[this.CurrentPlayer].doubleStrike = true;
      }
      if (ballNumber === 1) {
        this.BowlingState[this.CurrentPlayer].strike = false;
      }
    }
    if (this.BowlingState[this.CurrentPlayer].spare && ballNumber === 0) {
      this.BowlingState[this.CurrentPlayer].roundScore[
        this.FrameNumber - 1
      ] += pins;
      this.BowlingState[this.CurrentPlayer].spare = false;
    }
    if (
      this.BowlingState[this.CurrentPlayer].roundScore[this.FrameNumber] === 10
    ) {
      if (
        this.BowlingState[this.CurrentPlayer].frameScore[this.FrameNumber][1]
      ) {
        this.BowlingState[this.CurrentPlayer].spare = true;
        console.log("spare is true");
      } else {
        this.BowlingState[this.CurrentPlayer].strike = true;
        console.log("strike is true");
      }
    }
    this.calcTotalScore();
  }

  calcTotalScore(): void {
    this.BowlingState[this.CurrentPlayer].totalMatchScore = this.BowlingState[
      this.CurrentPlayer
    ].roundScore.reduce((a, b) => {
      return a + b;
    });
  }

  endGame(): void {
    console.log("game over");
  }
}
