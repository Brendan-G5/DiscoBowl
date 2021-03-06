import { Component, OnInit } from "@angular/core";
import { StateService } from "../../services/service-state.service";
import { Router } from "@angular/router";
import listOfColors from "../../constants/colors.js";

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

  //Adds player to the players array, stores all names before game starts
  addPlayer(name: string): void {
    if (this.players.includes(name)) {
      alert("Player already exists");
    } else {
      const randomColour =
        listOfColors[Math.floor(Math.random() * listOfColors.length)];
      this.players.push(name);
      setTimeout(() => {
        const els: any = document.getElementsByClassName("player-item");
        els[els.length - 1].style.backgroundColor = randomColour;
        const cont: any = document.getElementsByClassName(
          "player-item-cont"
        )[0];
        cont.scrollTop = cont.scrollHeight;
      }, 0);
    }
  }

  //Used to remove player from the players array
  deletePlayer(name: string): void {
    this.players = this.players.filter((player) => {
      return name !== player;
    });
  }

  //Called when game is ready to be played, Transfers names to the "state service"
  //Maybe not the best name, "Name service" would be better. The switchs to the play screen.
  playGame(): void {
    this.stateService.setPlayers(this.players);
    this.router.navigate(["play"]);
  }
}
