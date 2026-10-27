import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ExternalVibrationResult } from 'src/models/externalVibrationResult.model';
import { FinalVibrationResult } from 'src/models/finalVibrationResult.model';
import { InnerVibrationResult } from 'src/models/innerVibrationResult.model';

@Injectable({ providedIn: 'root' })
export class GuematrieService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private withSyllables(params: HttpParams, key: string, value: string): HttpParams {
    return value.trim() ? params.set(key, value.trim()) : params;
  }

  generateInner(firstName: string, firstNameSyllables: string = ''): Observable<InnerVibrationResult> {
    const params = this.withSyllables(new HttpParams(), 'firstNameSyllables', firstNameSyllables);
    return this.http.get<InnerVibrationResult>(this.apiUrl + '/guematrie/inner/' + encodeURIComponent(firstName), { params });
  }

  generateExternal(lastName: string, lastNameSyllables: string = ''): Observable<ExternalVibrationResult> {
    const params = this.withSyllables(new HttpParams(), 'lastNameSyllables', lastNameSyllables);
    return this.http.get<ExternalVibrationResult>(this.apiUrl + '/guematrie/external/' + encodeURIComponent(lastName), { params });
  }

  generateFinal(
    firstName: string,
    lastName: string,
    firstNameSyllables: string = '',
    lastNameSyllables: string = '',
    birthDate: string | null = null
  ): Observable<FinalVibrationResult> {
    let params = this.withSyllables(new HttpParams(), 'firstNameSyllables', firstNameSyllables);
    params = this.withSyllables(params, 'lastNameSyllables', lastNameSyllables);
    if (birthDate) params = params.set('birthDate', birthDate);

    return this.http.get<FinalVibrationResult>(
      this.apiUrl + '/guematrie/final/' + encodeURIComponent(firstName) + '/' + encodeURIComponent(lastName),
      { params }
    ).pipe(map(result => {
      if (birthDate && !Array.isArray(result.lectureAGroups)) {
        throw new Error('Le backend ne fournit pas encore les groupes de date. Recompilez et redémarrez GuematrieAPI, puis rechargez cette page.');
      }
      return { ...result, lectureA: result.lectureA ?? [], lectureAGroups: result.lectureAGroups ?? [] };
    }));
  }
}
