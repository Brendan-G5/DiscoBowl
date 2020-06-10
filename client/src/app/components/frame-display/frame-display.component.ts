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

  ngOnInit(): void {}

  ngOnChange(): void {}
}
