import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeWaveAnimationComponent } from './time-wave-animation.component';

describe('TimeWaveAnimationComponent', () => {
  let component: TimeWaveAnimationComponent;
  let fixture: ComponentFixture<TimeWaveAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeWaveAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeWaveAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
