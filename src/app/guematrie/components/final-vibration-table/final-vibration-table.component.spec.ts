import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FinalVibrationTableComponent } from './final-vibration-table.component';

describe('FinalVibrationTableComponent', () => {
  let component: FinalVibrationTableComponent;
  let fixture: ComponentFixture<FinalVibrationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalVibrationTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinalVibrationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the expected section headers', () => {
    const headers = fixture.debugElement
      .queryAll(By.css('thead th'))
      .map((header) => header.nativeElement.textContent.replace(/\s+/g, ' ').trim());

    expect(headers).toEqual([
      'Ce qui doit etre rendu, developpe',
      'Karma evolutif',
      'Astrologie',
    ]);
  });
});
