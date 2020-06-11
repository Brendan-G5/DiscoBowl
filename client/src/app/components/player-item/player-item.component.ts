import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-player-item",
  templateUrl: "./player-item.component.html",
  styleUrls: ["./player-item.component.css"],
})
export class PlayerItemComponent implements OnInit {
  @Input() player: string;
  @Output() deletePlayer: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  //Used for deleting player from the list
  onDelete(name: string): void {
    this.deletePlayer.emit(name);
  }
}
