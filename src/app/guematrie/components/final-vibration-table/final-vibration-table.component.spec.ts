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
  it('renders date vibrations in Lecture A and keeps the other readings unchanged', () => {
    component.finalVibrationResult.dateDetails = [25, 10, 19, 90].map(number => ({
      id: String(number), letter: '', vibrationNumber: number, description: 'Date ' + number,
      vibrationType: 0, vibrationColor: 0, karmic: false, consciousness: false,
    }));
    component.finalVibrationResult.dateDetailGroups = component.finalVibrationResult.dateDetails.map(detail => [detail]);
    fixture.detectChanges();
    const panels = fixture.debugElement.queryAll(By.css('.interpretation-panel'));
    expect(panels[0].nativeElement.textContent).toContain('Lecture A');
    const values = panels[0].queryAll(By.css('.circleLarge')).map(value => value.nativeElement.textContent.trim());
    expect(values).toEqual(['25', '10', '19', '90']);
    expect(panels[0].nativeElement.textContent).toContain('Date 25');
    expect(panels[1].nativeElement.textContent).toContain('Contenu a venir.');
  });

  it('renders an empty state when no date details are present', () => {
    expect(fixture.nativeElement.textContent).toContain('Aucun détail de date disponible.');
  });

  it('shows 11, 08, 19, 83 in Lecture A without changing other number formatting', () => {
    component.finalVibrationResult.dateDetails = [11, 8, 19, 83].map(number => ({
      id: String(number), letter: '', vibrationNumber: number, description: '',
      vibrationType: 0, vibrationColor: 0, karmic: false, consciousness: false,
    }));
    component.finalVibrationResult.dateDetailGroups = component.finalVibrationResult.dateDetails.map(detail => [detail]);
    fixture.detectChanges();
    const panel = fixture.debugElement.queryAll(By.css('.interpretation-panel'))[0];
    const values = panel.queryAll(By.css('.circleLarge')).map(value => value.nativeElement.textContent.trim());
    expect(values).toEqual(['11', '08', '19', '83']);
    component.finalVibrationResult.shouldBeReturnDetail = [component.finalVibrationResult.dateDetails[1]];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.result-panel .circleLarge')).nativeElement.textContent.trim()).toBe('8');
    const eight = { ...component.finalVibrationResult.dateDetails[1], karmic: true };
    expect(component.getFormattedDateVibrationNumber(eight)).toBe('08*');
    expect(component.getFormattedVibrationNumber(eight)).toBe('8*');
  });

  it('shows a separator only inside a decomposed date part', () => {
    const values = [11, 8, 19, 80, 3].map(number => ({
      id: String(number), letter: '', vibrationNumber: number, description: '',
      vibrationType: 0, vibrationColor: 0, karmic: false, consciousness: false,
    }));
    component.finalVibrationResult.dateDetails = values;
    component.finalVibrationResult.dateDetailGroups = [[values[0]], [values[1]], [values[2]], [values[3], values[4]]];
    fixture.detectChanges();
    const panel = fixture.debugElement.queryAll(By.css('.interpretation-panel'))[0];
    expect(panel.queryAll(By.css('.circleLarge')).map(value => value.nativeElement.textContent.trim()))
      .toEqual(['11', '08', '19', '80', '3']);
    const groups = panel.queryAll(By.css('.date-detail-group'));
    expect(groups.map(group => group.queryAll(By.css('.chain-separator')).length)).toEqual([0, 0, 0, 1]);
    expect(groups[3].queryAll(By.css('.detail-item'))[0].nativeElement.textContent).toContain('lie a');
    expect(groups[3].queryAll(By.css('.detail-item'))[1].nativeElement.textContent).not.toContain('lie a');
  });

  it('does not crash when a runtime response lacks dateDetailGroups', () => {
    const { dateDetailGroups, ...response } = component.finalVibrationResult;
    component.finalVibrationResult = response as typeof component.finalVibrationResult;
    expect(() => fixture.detectChanges()).not.toThrow();
  });

});
