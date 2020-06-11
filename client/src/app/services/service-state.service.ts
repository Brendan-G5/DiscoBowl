import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StateService {
  constructor() {}
  players: string[];

  //Simple service which carries the player names from the
  //'origin' route to the 'play' route

  setPlayers(newPlayers: string[]): void {
    this.players = newPlayers;
  }

  givePlayers(): string[] {
    return this.players;
  }
}
