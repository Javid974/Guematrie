import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FinalVibrationComponent } from './final-vibration.component';
import { FinalVibrationResult } from 'src/models/finalVibrationResult.model';
import { GuematrieService } from 'src/services/guematrie.service';

@Component({
  selector: 'app-final-vibration-table',
  template: '',
})
class FinalVibrationTableStubComponent {
  @Input() finalVibrationResult: FinalVibrationResult = {
    shouldBeReturn: 0,
    evolvingKarma: 0,
    shouldBeReturnDetail: [],
    evolvingKarmaDetail: [],
  };
  @Input() errorMessage: string = '';
}

describe('FinalVibrationComponent', () => {
  let component: FinalVibrationComponent;
  let fixture: ComponentFixture<FinalVibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalVibrationComponent, FinalVibrationTableStubComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              firstName: 'Jean',
              lastName: 'Dupont',
              birthDate: '2000-01-01',
              birthTime: '10:00',
            }),
          },
        },
        {
          provide: GuematrieService,
          useValue: {
            generateFinal: () =>
              of({
                shouldBeReturn: 11,
                evolvingKarma: 9,
                shouldBeReturnDetail: [],
                evolvingKarmaDetail: [],
              }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FinalVibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title and the dedicated table component', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement.textContent;
    const tableComponent = fixture.debugElement.query(
      By.directive(FinalVibrationTableStubComponent)
    );

    expect(title).toContain('Vibration Finale');
    expect(tableComponent).toBeTruthy();
  });

  it('should call goToExternalVibration when clicking the left button', () => {
    spyOn(component, 'goToExternalVibration');

    const button = fixture.debugElement.query(By.css('button[aria-label="Precedent"]'));
    button.triggerEventHandler('click');

    expect(component.goToExternalVibration).toHaveBeenCalled();
  });

  it('should keep the right button disabled', () => {
    const button = fixture.debugElement.query(By.css('button[aria-label="Suivant"]'));

    expect(button.nativeElement.disabled).toBeTrue();
  });
});
