import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-add-player",
  templateUrl: "./add-player.component.html",
  styleUrls: ["./add-player.component.css"],
})
export class AddPlayerComponent implements OnInit {
  @Output() addPlayer: EventEmitter<string> = new EventEmitter();

  toAdd: string;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.toAdd) {
      this.addPlayer.emit(this.toAdd);
      this.toAdd = "";
    }
  }
}
