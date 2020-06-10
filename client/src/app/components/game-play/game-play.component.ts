import { Component, OnInit } from "@angular/core";
import { FullPlayer } from "../../models/Player";
import { StateService } from "../../services/service-state.service";
import { BowlingStateService } from "../../services/bowling-state.service";

@Component({
  selector: "app-game-play",
  templateUrl: "./game-play.component.html",
  styleUrls: ["./game-play.component.css"],
})
export class GamePlayComponent implements OnInit {
  constructor(
    private stateService: StateService,
    private bowlService: BowlingStateService
  ) {}

  players: string[];
  fullPlayers: FullPlayer[];

  ngOnInit(): void {
    // this.players = this.stateService.players;
    this.players = ["Brendan", "Maya"];
    this.fullPlayers = [];
    this.players.forEach((name) => {
      this.fullPlayers.push({
        name: name,
        totalMatchScore: 0,
        roundScore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        frameScore: [[], [], [], [], [], [], [], [], [], []],
        gamesWon: 0,
        spare: false,
        strike: false,
        doubleStrike: false,
      });
    });
    this.bowlService.setBowlers(this.fullPlayers);
  }

  updateBoard(): void {
    this.fullPlayers = this.bowlService.getBowlers();
  }
}
