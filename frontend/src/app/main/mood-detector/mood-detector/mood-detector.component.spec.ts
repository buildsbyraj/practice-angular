import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodDetectorComponent } from './mood-detector.component';

describe('MoodDetectorComponent', () => {
  let component: MoodDetectorComponent;
  let fixture: ComponentFixture<MoodDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodDetectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoodDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
