import { Component, OnInit } from "@angular/core";
import { StateService } from "../../services/service-state.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-player-selection",
  templateUrl: "./player-selection.component.html",
  styleUrls: ["./player-selection.component.css"],
})
export class PlayerSelectionComponent implements OnInit {
  constructor(private stateService: StateService, private router: Router) {}

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

  playGame(): void {
    this.stateService.setPlayers(this.players);
    this.router.navigate(["play"]);
  }
}
