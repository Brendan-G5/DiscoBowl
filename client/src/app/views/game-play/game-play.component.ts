import { Component, OnInit } from "@angular/core";
import { StateService } from "../../services/service-state.service"

@Component({
  selector: "app-game-play",
  templateUrl: "./game-play.component.html",
  styleUrls: ["./game-play.component.css"],
})
export class GamePlayComponent implements OnInit {
  constructor(private stateService: StateService) {}

  players: string[];

  ngOnInit(): void {
    this.players = this.stateService.players;
  }
}
