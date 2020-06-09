import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-player-selection",
  templateUrl: "./player-selection.component.html",
  styleUrls: ["./player-selection.component.css"],
})
export class PlayerSelectionComponent implements OnInit {
  constructor() {}

  players: string[];

  ngOnInit(): void {
    this.players = [];
  }

  addPlayer(name: string): void {
    if (this.players.includes(name)) {
      alert("Player already exists");
    } else {
      this.players.push(name);
    }
  }

  deletePlayer(name: string): void {
    this.players = this.players.filter((player) => {
      return name !== player;
    });
  }
}
