import { Component, OnInit, Input } from "@angular/core";
import { FullPlayer } from "../../models/Player";

@Component({
  selector: "app-score-card",
  templateUrl: "./score-card.component.html",
  styleUrls: ["./score-card.component.css"],
})
export class ScoreCardComponent implements OnInit {
  constructor() {}

  @Input() player: FullPlayer;

  ngOnInit(): void {
  }
}
