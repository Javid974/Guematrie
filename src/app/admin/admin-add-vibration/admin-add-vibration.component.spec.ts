import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddVibrationComponent } from './admin-add-vibration.component';

describe('AdminAddVibrationComponent', () => {
  let component: AdminAddVibrationComponent;
  let fixture: ComponentFixture<AdminAddVibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddVibrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddVibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
