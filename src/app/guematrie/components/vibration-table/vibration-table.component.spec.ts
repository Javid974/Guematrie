import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VibrationTableComponent } from './vibration-table.component';

describe('VibrationTableComponent', () => {
  let component: VibrationTableComponent;
  let fixture: ComponentFixture<VibrationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VibrationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VibrationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
