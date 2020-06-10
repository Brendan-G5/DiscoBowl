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
  TenBall = 0;
  TenFirstHit: number;
  refreshNumbers = false;

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
    this.refreshNumbers = false;
    let spot = ballNumber;
    if (pins === 10) {
      spot = 1;
    }
    if (this.FrameNumber !== 9) {
      this.BowlingState[this.CurrentPlayer].frameScore[this.FrameNumber][
        spot
      ] = pins;
      this.calcScores(pins, ballNumber);
      if (pins === 10 || ballNumber === 1) {
        this.nextPlayer();
      }
    } else {
      this.BowlingState[this.CurrentPlayer].roundScore[
        this.FrameNumber
      ] += pins;
      this.BowlingState[this.CurrentPlayer].frameScore[this.FrameNumber][
        this.TenBall
      ] = pins;
      if (this.TenBall === 0) {
        this.TenFirstHit = pins;
        this.awardTriple(pins, ballNumber);
        this.awardDouble(pins, ballNumber);
        this.awardSpare(pins, ballNumber);
        this.calcTotalScore();
        this.TenBall++;
      } else if (this.TenBall === 1) {
        this.awardDouble(pins, ballNumber);
        this.awardSpare(pins, ballNumber);
        this.calcTotalScore();
        this.TenBall++;
        if (this.TenFirstHit + pins < 10) {
          this.TenBall = 0;
          this.nextPlayer();
          this.refreshNumbers = true;
        }
      } else if (this.TenBall === 2) {
        this.calcTotalScore();
        this.TenBall = 0;
        this.nextPlayer();
      }
    }
    console.log(this.BowlingState);
  }

  calcScores(pins: number, ballNumber: number): void {
    this.BowlingState[this.CurrentPlayer].roundScore[this.FrameNumber] += pins;
    this.awardTriple(pins, ballNumber);
    this.awardDouble(pins, ballNumber);
    this.awardSpare(pins, ballNumber);
    this.checkForSpecial(ballNumber);
    this.calcTotalScore();
  }

  awardTriple(pins: number, ballNumber: number): void {
    if (this.BowlingState[this.CurrentPlayer].doubleStrike) {
      this.BowlingState[this.CurrentPlayer].roundScore[
        this.FrameNumber - 2
      ] += pins;
      if (ballNumber === 1) {
        this.BowlingState[this.CurrentPlayer].doubleStrike = false;
      }
    }
  }

  awardDouble(pins: number, ballNumber: number): void {
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
  }

  awardSpare(pins: number, ballNumber: number): void {
    if (this.BowlingState[this.CurrentPlayer].spare && ballNumber === 0) {
      this.BowlingState[this.CurrentPlayer].roundScore[
        this.FrameNumber - 1
      ] += pins;
      this.BowlingState[this.CurrentPlayer].spare = false;
    }
  }

  checkForSpecial(ballNumber: number): void {
    if (
      this.BowlingState[this.CurrentPlayer].roundScore[this.FrameNumber] === 10
    ) {
      if (ballNumber === 0) {
        console.log("strike is true");
        this.BowlingState[this.CurrentPlayer].strike = true;
      } else {
        console.log("spare is true");
        this.BowlingState[this.CurrentPlayer].spare = true;
      }
    }
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
