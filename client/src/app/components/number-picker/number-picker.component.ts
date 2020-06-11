import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BowlingStateService } from "../../services/bowling-state.service";
@Component({
  selector: "app-number-picker",
  templateUrl: "./number-picker.component.html",
  styleUrls: ["./number-picker.component.css"],
})
export class NumberPickerComponent implements OnInit {
  @Output("updateBoard") updateBoard: EventEmitter<any> = new EventEmitter();

  constructor(private bowlService: BowlingStateService) {}

  buttons: number[];
  ballNumber = 0;
  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnInit(): void {
    this.resetNumbers();
    this.ballNumber = 0;
  }

  //Used when numbers should reset on an off pattern (for example, in frame 10)
  resetNumbers(): void {
    this.buttons = this.numbers;
    this.ballNumber = 0;
  }

  //Here is where we bowl! This is the function that starts it all.
  //It calls bowlservice.throw will the number of hit pins and the ball number.
  //The serivce is managing the game and alters its Object accordingly.
  //At the end the board is updated with the new information.
  bowl(pins: number): void {
    this.bowlService.throw(pins, this.ballNumber);
    if (this.ballNumber === 0 && pins !== 10) {
      const sliceTo = 11 - pins;
      this.buttons = this.buttons.slice(0, sliceTo);
      this.ballNumber++;
    } else {
      this.buttons = this.numbers;
      this.ballNumber = 0;
    }
    if (this.bowlService.refreshNumbers) {
      this.resetNumbers();
    }
    this.updateBoard.emit();
  }
}
