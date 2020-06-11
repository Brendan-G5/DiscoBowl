import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-frame-display",
  templateUrl: "./frame-display.component.html",
  styleUrls: ["./frame-display.component.css"],
})
export class FrameDisplayComponent implements OnInit {
  constructor() {}

  @Input() frameScore: number[];
  @Input() roundScore: number[];

  //As the service state is creating objects that come out just the way i want them
  //all of the logic is done in the html file with ngIf etc...

  ngOnInit(): void {}

  ngOnChange(): void {}
}
