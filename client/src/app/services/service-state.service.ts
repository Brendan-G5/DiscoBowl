import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StateService {
  constructor() {}
  players: string[];

  setPlayers(newPlayers: string[]): void {
    this.players = newPlayers;
  }

  givePlayers(): string[] {
    return this.players;
  }
}
