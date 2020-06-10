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
  }

  resetNumbers(): void {
    this.buttons = this.numbers;
  }

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
    this.updateBoard.emit();
  }
}
