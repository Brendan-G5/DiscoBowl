import { Injectable } from "@angular/core";
import { FullPlayer } from "../models/Player";

@Injectable({
  providedIn: "root",
})

//This on is a bit of a beast, but this is where all of the bowling happens!
//This is called with a number of pins and a ball number.
//It manages scores, total games won, individual frame scores and everything
//else that is needed to run and show the bowling game.
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
  gameover = false;

  //This is used to set the bowlers, it is used only once when the initial
  //play game is pressed.
  setBowlers(players: FullPlayer[]): void {
    this.BowlingState = players;
    this.NumberOfPlayers = players.length;
  }

  //This function returns the BowlingState, this is the state object that holds all
  //game information for each player.
  getBowlers(): FullPlayer[] {
    return this.BowlingState;
  }

  //This function makes the state object change its current player
  //to the next in line. It will also end the game/change the framenumber when needed.
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

  //This is the function that is called from the outside in order to register
  //a thrown ball.
  throw(pins: number, ballNumber: number): void {
    this.refreshNumbers = false;
    let spot = ballNumber;
    if (pins === 10) {
      spot = 1;
    }
    //I treat the last frame seperatly from the first 9, here is the split
    if (this.FrameNumber !== 9) {
      this.BowlingState[this.CurrentPlayer].frameScore[this.FrameNumber][
        spot
      ] = pins;
      this.calcScores(pins, ballNumber);
      if (pins === 10 || ballNumber === 1) {
        this.nextPlayer();
      }
    } else {
      this.tenthFrame(pins, ballNumber);
    }
  }

  //This frame is pretty hard coded, could likely be less code, something to work on
  tenthFrame(pins: number, ballNumber: number): void {
    this.BowlingState[this.CurrentPlayer].roundScore[this.FrameNumber] += pins;
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
      this.refreshNumbers = true;
    }
  }

  //This function is used after every throw in the first 9 frames.
  //It adds the number of hit pins to that frames points
  //then checks for other points needing to be awared in previous frames.
  calcScores(pins: number, ballNumber: number): void {
    this.BowlingState[this.CurrentPlayer].roundScore[this.FrameNumber] += pins;
    this.awardTriple(pins, ballNumber);
    this.awardDouble(pins, ballNumber);
    this.awardSpare(pins, ballNumber);
    this.checkForSpecial(ballNumber);
    this.calcTotalScore();
  }

  //This is what is going to award a triple, meaning you already have
  //two strikes in a row.
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

  //This function is going to award a double, meaning that your last roll was a strike.
  //It is also here that we check if you you're on a roll and have gotten a double strike
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

  //This function is awards spare points, meaning your last roll was a spare
  awardSpare(pins: number, ballNumber: number): void {
    if (this.BowlingState[this.CurrentPlayer].spare && ballNumber === 0) {
      this.BowlingState[this.CurrentPlayer].roundScore[
        this.FrameNumber - 1
      ] += pins;
      this.BowlingState[this.CurrentPlayer].spare = false;
    }
  }

  //This function checks for your specials, so here we decide if
  //your current roll was a strike/spare.
  checkForSpecial(ballNumber: number): void {
    if (
      this.BowlingState[this.CurrentPlayer].roundScore[this.FrameNumber] === 10
    ) {
      if (ballNumber === 0) {
        this.BowlingState[this.CurrentPlayer].strike = true;
      } else {
        this.BowlingState[this.CurrentPlayer].spare = true;
      }
    }
  }

  //This function is called simply to get a sum of all the round scores and produce
  //a total score for the game
  calcTotalScore(): void {
    this.BowlingState[this.CurrentPlayer].totalMatchScore = this.BowlingState[
      this.CurrentPlayer
    ].roundScore.reduce((a, b) => {
      return a + b;
    });
  }

  //This is called when the final frame finishes
  //It checks for a winner and increases games won for that person.
  //Points go to all of those involved in a tie
  endGame(): void {
    this.gameover = true;
    let maxScore = 0;
    let playerIndex = [];
    for (let i = 0; i < this.BowlingState.length; i++) {
      if (this.BowlingState[i].totalMatchScore > maxScore) {
        maxScore = this.BowlingState[i].totalMatchScore;
        playerIndex = [i];
      } else if (this.BowlingState[i].totalMatchScore === maxScore) {
        playerIndex.push(i);
      }
    }
    playerIndex.forEach((index) => {
      this.BowlingState[index].gamesWon++;
    });
    this.CurrentPlayer = Infinity;
  }

  //Rematch is called when you want to play again
  //It sets all necessary values back to a starting position
  //both for the game properties and the player properties
  rematch(): void {
    this.FrameNumber = 0;
    this.PlayerNumber = 0;
    this.CurrentPlayer = 0;
    this.TenBall = 0;
    this.refreshNumbers = false;
    this.gameover = false;
    this.BowlingState.forEach((player) => {
      (player.totalMatchScore = 0),
        (player.roundScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        (player.frameScore = [[], [], [], [], [], [], [], [], [], []]),
        (player.spare = false),
        (player.strike = false),
        (player.doubleStrike = false);
    });
  }
}
