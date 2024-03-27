// vibration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vibration } from 'src/models/vibration.model';



@Injectable({
  providedIn: 'root'
})
export class VibrationService {
  private apiUrl = environment.apiUrl; // Utilisez l'URL de l'objet environment

  constructor(private http: HttpClient) { }

  saveVibrations(vibrations: Vibration[]): Observable<Vibration[]> {
    return this.http.post<Vibration[]>(`${this.apiUrl}/vibrations`, vibrations);
  }

  // saveVibrations2(vibrations: Vibration2[]): Observable<Vibration2[]> {
  //   return this.http.post<Vibration2[]>(`${this.apiUrl}/vibrations2`, vibrations);
  // }
}
