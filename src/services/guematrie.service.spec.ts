import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { GuematrieService } from './guematrie.service';

describe('GuematrieService API generation', () => {
  let service: GuematrieService;
  let http: HttpTestingController;
  const api = environment.apiUrl + '/guematrie';
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(GuematrieService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('keeps automatic generation and omits empty optional parameters', () => {
    service.generateInner('CH').subscribe();
    service.generateExternal('H', '  ').subscribe();
    service.generateFinal('CH', 'H').subscribe();
    for (const suffix of ['/inner/CH', '/external/H', '/final/CH/H']) {
      const req = http.expectOne(api + suffix);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.keys()).toEqual([]);
      req.flush({});
    }
  });

  it('passes manual syllables to the inner and external endpoints', () => {
    service.generateInner('CH', ' C - H ').subscribe();
    service.generateExternal('CH', 'CH').subscribe();
    const inner = http.expectOne(req => req.url === api + '/inner/CH');
    expect(inner.request.params.get('firstNameSyllables')).toBe('C - H');
    inner.flush({ syllabes: ['c', 'h'] });
    const external = http.expectOne(req => req.url === api + '/external/CH');
    expect(external.request.params.get('lastNameSyllables')).toBe('CH');
    external.flush({ syllabes: ['ch'] });
    http.expectNone(req => req.url.endsWith('/vibrations') || req.url.endsWith('/tarots'));
  });

  for (const [first, last] of [['C-H', 'CH'], ['C-H', ''], ['', 'C-H']]) {
    it(`uses one final API request with syllables ${first}/${last} and birth date`, () => {
      let result: any;
      service.generateFinal('CH', 'CH', first, last, '1990-10-25').subscribe(value => result = value);
      const req = http.expectOne(req => req.url === api + '/final/CH/CH');
      expect(req.request.params.get('firstNameSyllables')).toBe(first || null);
      expect(req.request.params.get('lastNameSyllables')).toBe(last || null);
      expect(req.request.params.get('birthDate')).toBe('1990-10-25');
      req.flush({ shouldBeReturn: 31, lectureA: [], lectureAGroups: [[], [], [], []] });
      expect(result.shouldBeReturn).toBe(31);
      expect(result.lectureAGroups.length).toBe(4);
      http.expectNone(() => true);
    });
  }

  it('propagates API validation errors', () => {
    const error = jasmine.createSpy('error');
    service.generateInner('CH', 'C--H').subscribe({ error });
    http.expectOne(req => req.url === api + '/inner/CH')
      .flush('Syllabes invalides', { status: 400, statusText: 'Bad Request' });
    expect(error.calls.mostRecent().args[0].status).toBe(400);
  });

  it('encodes names in endpoint paths', () => {
    service.generateInner('Jean/Pierre', 'Jean-Pierre').subscribe();
    http.expectOne(req => req.url === api + '/inner/Jean%2FPierre').flush({});
  });

  it('reports an outdated backend when birth date groups are missing', () => {
    const error = jasmine.createSpy('error');
    service.generateFinal('CH', 'H', '', '', '1983-08-11').subscribe({ error });
    http.expectOne(req => req.url === api + '/final/CH/H').flush({ lectureA: [] });
    expect(error.calls.mostRecent().args[0].message).toContain('redémarrez GuematrieAPI');
  });
});
