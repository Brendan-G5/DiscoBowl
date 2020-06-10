import { Injectable } from "@angular/core";
import { FullPlayer } from "../models/Player";

@Injectable({
  providedIn: "root",
})
export class BowlingStateService {
  constructor() {}
  BowlingState: FullPlayer[];
  FrameNumber: number;
  BallNumber: number;
  PlayerNumber: number;

  setBowlers(players: FullPlayer[]): void {
    this.BowlingState = players;
    console.log(this.BowlingState);
  }
}
