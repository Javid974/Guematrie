import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InnerVibrationComponent } from './inner-vibration.component';

describe('InnerVibrationComponent', () => {
  let component: InnerVibrationComponent;
  let fixture: ComponentFixture<InnerVibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InnerVibrationComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InnerVibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
