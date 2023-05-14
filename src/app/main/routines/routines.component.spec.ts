import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutinesComponent } from './routines.component';

describe('RoutinesComponent', () => {
  let component: RoutinesComponent;
  let fixture: ComponentFixture<RoutinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
