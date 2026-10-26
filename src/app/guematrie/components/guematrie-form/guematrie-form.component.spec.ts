import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GuematrieFormComponent } from './guematrie-form.component';

describe('GuematrieFormComponent', () => {
  let component: GuematrieFormComponent;
  let fixture: ComponentFixture<GuematrieFormComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [GuematrieFormComponent],
      imports: [FormsModule],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();
    fixture = TestBed.createComponent(GuematrieFormComponent);
    component = fixture.componentInstance;
    component.guematrieParams.firstName = 'Marie';
    component.guematrieParams.lastName = 'Dupont';
    fixture.detectChanges();
  });

  it('shows the manual fields only when the checkbox is selected', () => {
    expect(fixture.nativeElement.querySelector('#firstNameSyllables')).toBeNull();
    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('#manualSyllables');
    checkbox.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#firstNameSyllables')).toBeTruthy();
  });

  it('sends manual syllables when enabled', () => {
    component.manualSyllables = true;
    component.guematrieParams.firstNameSyllables = 'Ma-rie';
    component.guematrieParams.lastNameSyllables = 'Du-pont';
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/inner-vibration'], {
      queryParams: jasmine.objectContaining({ firstNameSyllables: 'Ma-rie', lastNameSyllables: 'Du-pont' }),
    });
  });

  it('rejects missing letters, empty syllables and nonletters before navigation', () => {
    component.manualSyllables = true;
    for (const invalid of ['Ma-ri', 'Ma--rie', 'Ma1-rie', 'Rie-ma']) {
      component.guematrieParams.firstNameSyllables = invalid;
      component.onSubmit();
      expect(router.navigate).not.toHaveBeenCalled();
    }
  });

  it('accepts accents, compound names, one syllable and blank automatic overrides', () => {
    component.manualSyllables = true;
    expect(component.syllableError('Élodie', 'É-lo-die')).toBe('');
    expect(component.syllableError('Jean-Luc', 'Jean-Luc')).toBe('');
    expect(component.syllableError('Marie', 'Marie')).toBe('');
    expect(component.syllableError('Marie', '')).toBe('');
  });

  it('ignores previously typed overrides after returning to automatic mode', () => {
    component.guematrieParams.firstNameSyllables = 'invalid';
    component.manualSyllables = false;
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/inner-vibration'], {
      queryParams: jasmine.objectContaining({ firstNameSyllables: undefined, lastNameSyllables: undefined }),
    });
  });
  it('preserves the date-only input in the parameters sent to the first result page', () => {
    component.guematrieParams.birthDate = '1990-10-25';
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/inner-vibration'], {
      queryParams: jasmine.objectContaining({ birthDate: '1990-10-25' }),
    });
  });

});
