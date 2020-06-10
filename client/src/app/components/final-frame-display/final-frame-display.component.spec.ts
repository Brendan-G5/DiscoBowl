import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalFrameDisplayComponent } from './final-frame-display.component';

describe('FinalFrameDisplayComponent', () => {
  let component: FinalFrameDisplayComponent;
  let fixture: ComponentFixture<FinalFrameDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalFrameDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalFrameDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
