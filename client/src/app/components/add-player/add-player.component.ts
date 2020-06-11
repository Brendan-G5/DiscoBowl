import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  assertPlatform,
} from "@angular/core";

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

  //Called when enter hit or submit pressed, checks for length then
  //adds player to the players object stored in parent component with emit.
  onSubmit(): void {
    if (this.toAdd && this.toAdd.length < 10) {
      this.addPlayer.emit(this.toAdd);
      this.toAdd = "";
    } else if (this.toAdd.length >= 10) {
      alert("Name must be under 10 characters");
    }
  }
}
