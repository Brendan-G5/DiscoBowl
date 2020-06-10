import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-final-frame-display",
  templateUrl: "./final-frame-display.component.html",
  styleUrls: ["./final-frame-display.component.css"],
})
export class FinalFrameDisplayComponent implements OnInit {
  constructor() {}

  @Input() frameScore: number[];
  @Input() roundScore: number[];

  ngOnInit(): void {}
}
