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
  finished = false;
  livePlayer: FullPlayer;

  //Initiates the game screen by getting names from the name service
  //Then creating a Player object based off the model for each player
  //and saves that model to the Bowling Service(where all bowling logic runs)
  ngOnInit(): void {
    this.players = this.stateService.players;
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
    this.livePlayer = this.bowlService.getBowlers()[0];
  }

  //Calls rematch in Bowling Service and prepares any properties
  //for a rematch, also used in complete reset (in addition to a router change)
  playAgain(): void {
    this.bowlService.rematch();
    this.finished = false;
    this.fullPlayers = this.bowlService.getBowlers();
    this.livePlayer = this.fullPlayers[this.bowlService.CurrentPlayer];
  }

  //Called on each roll to get updated information from the state
  //so that it can be displayed on the scorecards
  updateBoard(): void {
    this.fullPlayers = this.bowlService.getBowlers();
    this.livePlayer = this.fullPlayers[this.bowlService.CurrentPlayer];
    if (this.bowlService.gameover) {
      this.finished = true;
    }
    this.scroll();
  }

  //Used to scroll to the current player in the scorecard list
  scroll(): void {
    setTimeout(() => {
      const el: HTMLElement = document.getElementsByClassName(
        "live"
      )[0] as HTMLElement;
      console.log(el);
      el.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }
}
