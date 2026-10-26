import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { defer, forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ExternalVibrationResult } from 'src/models/externalVibrationResult.model';
import { FinalVibrationResult } from 'src/models/finalVibrationResult.model';
import { InnerVibrationResult } from 'src/models/innerVibrationResult.model';
import { Tarot } from 'src/models/tarot.model';
import { Vibration } from 'src/models/vibration.model';
import { VibrationResult } from 'src/models/vibrationResult.model';
import { ManualGuematrieCalculator as Calculator } from './manual-guematrie-calculator';

@Injectable({ providedIn: 'root' })
export class GuematrieService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private manualSyllables(input: string): string[] | null {
    return input.trim() ? input.split('-').map(syllable => syllable.trim()) : null;
  }

  private referenceData(): Observable<{ vibrations: Vibration[]; tarots: Tarot[] }> {
    return forkJoin({
      vibrations: this.http.get<Vibration[]>(this.apiUrl + '/vibrations'),
      tarots: this.http.get<Tarot[]>(this.apiUrl + '/tarots'),
    });
  }

  private calculateManual(name: string, syllables: string[]): Observable<VibrationResult> {
    return defer(() => {
      const validated = Calculator.validateSyllables(name, syllables);
      return this.referenceData().pipe(map(({ vibrations, tarots }) => Calculator.calculate(validated, vibrations, tarots)));
    });
  }

  generateInner(firstName: string, firstNameSyllables: string = ''): Observable<InnerVibrationResult> {
    const syllables = this.manualSyllables(firstNameSyllables);
    return syllables !== null
      ? this.calculateManual(firstName, syllables)
      : this.http.get<InnerVibrationResult>(this.apiUrl + '/guematrie/inner/' + encodeURIComponent(firstName));
  }

  generateExternal(lastName: string, lastNameSyllables: string = ''): Observable<ExternalVibrationResult> {
    const syllables = this.manualSyllables(lastNameSyllables);
    return syllables !== null
      ? this.calculateManual(lastName, syllables)
      : this.http.get<ExternalVibrationResult>(this.apiUrl + '/guematrie/external/' + encodeURIComponent(lastName));
  }

  generateFinal(
    firstName: string,
    lastName: string,
    firstNameSyllables: string = '',
    lastNameSyllables: string = '',
    birthDate: string | null = null
  ): Observable<FinalVibrationResult> {
    const first = this.manualSyllables(firstNameSyllables);
    const last = this.manualSyllables(lastNameSyllables);

    if (first === null && last === null) {
      const params = birthDate
        ? new HttpParams().set('birthDate', birthDate)
        : new HttpParams();

      return this.http.get<FinalVibrationResult>(
        this.apiUrl + '/guematrie/final/' + encodeURIComponent(firstName) + '/' + encodeURIComponent(lastName),
        { params }
      ).pipe(map(result => {
        const dateDetails = result.dateDetails ?? [];
        if (birthDate && !Array.isArray(result.dateDetailGroups)) {
          throw new Error('Le backend ne fournit pas encore les groupes de date. Recompilez et redémarrez GuematrieAPI, puis rechargez cette page.');
        }
        return { ...result, dateDetails, dateDetailGroups: result.dateDetailGroups ?? [] };
      }));
    }

    return this.calculateFinalWithManualSyllables(firstName, lastName, first, last, birthDate);
  }

  private calculateFinalWithManualSyllables(
    firstName: string,
    lastName: string,
    first: string[] | null,
    last: string[] | null,
    birthDate: string | null
  ): Observable<FinalVibrationResult> {
    return defer(() => {
      const firstSyllables = first !== null
        ? Calculator.validateSyllables(firstName, first)
        : null;
      const lastSyllables = last !== null
        ? Calculator.validateSyllables(lastName, last)
        : null;

      const calculationData = forkJoin({
        references: this.referenceData(),
        inner: firstSyllables !== null ? of(null) : this.generateInner(firstName),
        external: lastSyllables !== null ? of(null) : this.generateExternal(lastName),
      });

      return calculationData.pipe(
        map(data => {
          const { vibrations, tarots } = data.references;

          const innerResult = firstSyllables !== null
            ? Calculator.calculate(firstSyllables, vibrations, tarots)
            : data.inner!;
          const externalResult = lastSyllables !== null
            ? Calculator.calculate(lastSyllables, vibrations, tarots)
            : data.external!;

          return Calculator.calculateFinal(
            innerResult,
            externalResult,
            vibrations,
            tarots,
            birthDate
          );
        })
      );
    });
  }
}
