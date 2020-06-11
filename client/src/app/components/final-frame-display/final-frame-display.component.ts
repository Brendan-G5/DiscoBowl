import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-final-frame-display",
  templateUrl: "./final-frame-display.component.html",
  styleUrls: ["./final-frame-display.component.css"],
})
export class FinalFrameDisplayComponent implements OnInit {
  constructor() {}

  //As the service state is creating objects that come out just the way i want them
  //all of the logic is done in the html file with ngIf etc...

  @Input() frameScore: number[];
  @Input() roundScore: number[];

  ngOnInit(): void {}
}
