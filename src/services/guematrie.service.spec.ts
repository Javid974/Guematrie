import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InnerVibrationComponent } from 'src/app/guematrie/components/inner-vibration/inner-vibration.component';
import { ExternalVibrationComponent } from 'src/app/guematrie/components/external-vibration/external-vibration.component';
import { FinalVibrationComponent } from 'src/app/guematrie/components/final-vibration/final-vibration.component';
import { VibrationTableComponent } from 'src/app/guematrie/components/vibration-table/vibration-table.component';
import { VibrationResult } from 'src/models/vibrationResult.model';
import { Vibration } from 'src/models/vibration.model';
import { Tarot } from 'src/models/tarot.model';
import { GuematrieService } from './guematrie.service';

describe('GuematrieService local manual calculation', () => {
  let service: GuematrieService;
  let http: HttpTestingController;
  const api = environment.apiUrl;
  const vibrations: Vibration[] = Array.from({ length: 100 }, (_, index) => ({
    id: String(index + 1), vibrationNumber: index + 1,
    letter: ({ 1: 'A', 3: 'C', 8: 'H', 20: 'CH' } as Record<number, string>)[index + 1] ?? '',
    description: String(index + 1), vibrationType: 0, vibrationColor: 0, karmic: false, consciousness: false,
  }));
  const tarots: Tarot[] = Array.from({ length: 19 }, (_, number) => ({
    id: String(number), number, name: `Carte ${number}`, description: null, imagePath: '', vibrationId: null,
  }));

  function flushReferences(data = vibrations): void {
    http.expectOne(api + '/vibrations').flush(data);
    http.expectOne(api + '/tarots').flush(tarots);
  }

  function expectNoGenerationRequest(): void {
    http.expectNone(request => request.url.includes('/guematrie/'));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule], declarations: [VibrationTableComponent],
    });
    service = TestBed.inject(GuematrieService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('keeps automatic generation for names without manually entered syllables', () => {
    service.generateInner('CH').subscribe();
    service.generateExternal('H', '  ').subscribe();
    service.generateFinal('CH', 'H').subscribe();
    for (const suffix of ['/inner/CH', '/external/H', '/final/CH/H']) {
      const request = http.expectOne(api + '/guematrie' + suffix);
      expect(request.request.method).toBe('GET');
      request.flush({});
    }
  });

  it('calculates manual syllables locally and renders the resulting table without generation requests', () => {
    let result!: VibrationResult;
    service.generateInner('CH', ' C - H ').subscribe(value => result = value);
    expectNoGenerationRequest();
    flushReferences();
    expect(result.syllabes).toEqual(['c', 'h']);
    expect(result.growthStage.stage).toEqual([3, 8]);
    expect(result.vibrationSummation.summation).toBe(11);
    expect(result.vibrationAdvices[0].advice).toBe(5);
    expect(result.vibrationTarot.summationTarot).toBe(2);
    const fixture = TestBed.createComponent(VibrationTableComponent);
    fixture.componentInstance.vibrationResult = result;
    fixture.detectChanges();
    const table: HTMLElement = fixture.nativeElement;
    expect(table.textContent).toContain('11');
    expect(table.querySelector('td[rowspan="2"]')).toBeTruthy();
    expect(table.querySelectorAll('.narrow-column')[1].textContent?.trim()).toBe('c');
    expectNoGenerationRequest();
  });

  it('keeps a whole manual syllable intact, including a two-letter vibration', () => {
    let result!: VibrationResult;
    service.generateExternal('CH', 'CH').subscribe(value => result = value);
    flushReferences();
    expect(result.syllabes).toEqual(['ch']);
    expect(result.vibration[0].map(item => item.letter)).toEqual(['CH']);
    expect(result.vibrationSummation.summation).toBe(20);
    expectNoGenerationRequest();
  });

  it('calculates the final result entirely locally when both names have manual syllables', () => {
    let result: any;
    service.generateFinal('CH', 'CH', 'C-H', 'CH').subscribe(value => result = value);
    flushReferences();
    expect(result.shouldBeReturn).toBe(31);
    expect(result.evolvingKarma).toBe(9);
    expect(result.shouldBeReturnTarot.summationTarot).toBe(4);
    expectNoGenerationRequest();
  });

  it('uses automatic calculation only for the name whose manual field is empty', () => {
    let result: any;
    service.generateFinal('CH', 'H', 'C-H', '').subscribe(value => result = value);
    flushReferences();
    http.expectOne(api + '/guematrie/external/H').flush({ vibrationSummation: { summation: 8 } });
    expect(result.shouldBeReturn).toBe(19);
    expect(result.evolvingKarma).toBe(3);
    expectNoGenerationRequest();
  });

  it('rejects invalid manual input before making any request', () => {
    for (const input of ['C--H', 'C-X', '-CH']) {
      const error = jasmine.createSpy('error');
      service.generateInner('CH', input).subscribe({ error });
      expect(error).toHaveBeenCalled();
    }
    http.expectNone(() => true);
  });

  it('reports missing vibration data without falling back to a generation route', () => {
    const error = jasmine.createSpy('error');
    service.generateInner('CH', 'C-H').subscribe({ error });
    flushReferences(vibrations.filter(item => item.letter !== 'H'));
    expect(error.calls.mostRecent().args[0].message).toContain("'h'");
    expectNoGenerationRequest();
  });

  it('reports reference loading errors without retrying through generation', () => {
    const error = jasmine.createSpy('error');
    service.generateInner('CH', 'C-H').subscribe({ error });
    const referenceVibrations = http.expectOne(api + '/vibrations');
    http.expectOne(api + '/tarots');
    referenceVibrations.flush('Unavailable', { status: 500, statusText: 'Error' });
    expect(error).toHaveBeenCalled();
    expectNoGenerationRequest();
  });

  it('preserves manual syllables through all result pages without calling any generation route', () => {
    const params = { firstName: 'CH', lastName: 'CH', firstNameSyllables: 'C-H', lastNameSyllables: 'CH', birthDate: '1990-10-25' };
    const route = { queryParams: of(params) } as unknown as ActivatedRoute;
    const router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    const inner = new InnerVibrationComponent(route, router, service);
    inner.ngOnInit();
    flushReferences();
    expect(inner.vibrationResult.syllabes).toEqual(['c', 'h']);
    inner.goToExternalVibration();
    const external = new ExternalVibrationComponent(route, router, service);
    external.ngOnInit();
    flushReferences();
    expect(external.vibrationResult.syllabes).toEqual(['ch']);
    external.goToFinalVibration();
    const final = new FinalVibrationComponent(route, router, service);
    final.ngOnInit();
    expectNoGenerationRequest();
    flushReferences();
    expect(final.finalVibrationResult.dateDetails.map(item => item.vibrationNumber)).toEqual([25, 10, 19, 90]);
    expect(final.finalVibrationResult.shouldBeReturn).toBe(31);
    final.goToExternalVibration();
    for (const call of router.navigate.calls.allArgs()) {
      expect(call[1]?.queryParams).toEqual(jasmine.objectContaining(params));
    }
    expectNoGenerationRequest();
  });
  it('sends the optional birth date to the automatic final endpoint', () => {
    let result: any;
    service.generateFinal('CH', 'H', '', '', '1990-10-25').subscribe(value => result = value);
    const request = http.expectOne(req => req.url === api + '/guematrie/final/CH/H');
    expect(request.request.params.get('birthDate')).toBe('1990-10-25');
    request.flush({ dateDetails: [vibrations[24], vibrations[9], vibrations[18], vibrations[89]],
      dateDetailGroups: [[vibrations[24]], [vibrations[9]], [vibrations[18]], [vibrations[89]]] });
    expect(result.dateDetails.map((item: Vibration) => item.vibrationNumber)).toEqual([25, 10, 19, 90]);
  });

  it('omits the birth date query parameter when no date is supplied', () => {
    service.generateFinal('CH', 'H').subscribe();
    const request = http.expectOne(api + '/guematrie/final/CH/H');
    expect(request.request.params.has('birthDate')).toBeFalse();
    request.flush({ dateDetails: [] });
  });

  it('calculates date details locally in mixed mode while preserving manual syllables', () => {
    let result: any;
    service.generateFinal('CH', 'H', 'C-H', '', '1990-10-25').subscribe(value => result = value);
    flushReferences();
    http.expectOne(api + '/guematrie/external/H').flush({ vibrationSummation: { summation: 8 } });
    expect(result.dateDetails.map((item: Vibration) => item.vibrationNumber)).toEqual([25, 10, 19, 90]);
    expect(result.shouldBeReturn).toBe(19);
    http.expectNone(req => req.url.includes('/guematrie/final/'));
    http.expectNone(req => req.url.includes('/guematrie/inner/'));
    http.expectNone(req => req.url.includes('/date-details'));
  });

  it('reports an outdated backend instead of passing undefined date groups to the table', () => {
    const error = jasmine.createSpy('error');
    const next = jasmine.createSpy('next');
    service.generateFinal('CH', 'H', '', '', '1983-08-11').subscribe({ next, error });
    http.expectOne(req => req.url === api + '/guematrie/final/CH/H')
      .flush({ dateDetails: [vibrations[10], vibrations[7], vibrations[18], vibrations[79], vibrations[2]] });
    expect(next).not.toHaveBeenCalled();
    expect(error.calls.mostRecent().args[0].message).toContain('redémarrez GuematrieAPI');
  });

  it('initializes missing date arrays when no date is supplied to an older backend', () => {
    let result: any;
    service.generateFinal('CH', 'H').subscribe(value => result = value);
    http.expectOne(api + '/guematrie/final/CH/H').flush({});
    expect(result.dateDetails).toEqual([]);
    expect(result.dateDetailGroups).toEqual([]);
  });

});
