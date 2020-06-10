import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FrameDisplayComponent } from "./frame-display.component";

describe("FrameDisplayComponent", () => {
  let component: FrameDisplayComponent;
  let fixture: ComponentFixture<FrameDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrameDisplayComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
