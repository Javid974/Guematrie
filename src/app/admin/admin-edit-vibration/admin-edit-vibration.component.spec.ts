import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditVibrationComponent } from './admin-edit-vibration.component';

describe('AdminEditVibrationComponent', () => {
  let component: AdminEditVibrationComponent;
  let fixture: ComponentFixture<AdminEditVibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditVibrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditVibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
