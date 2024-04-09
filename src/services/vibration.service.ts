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

  getAll(): Observable<Vibration[]> {
    return this.http.get<Vibration[]>(`${this.apiUrl}/vibrations`);
  }

  get(id: string|null): Observable<Vibration> {
    return this.http.get<Vibration>(`${this.apiUrl}/vibrations/${id}`);
  }

  update(vibration: Vibration): Observable<any> {
    return this.http.put(`${this.apiUrl}/vibrations/${vibration.id}`, vibration);
  }

  delete (id : string) : Observable<any> {
    return this.http.delete(`${this.apiUrl}/vibrations/${id}`);
  }

  downloadFile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vibrations/download`, { responseType: 'blob' });
  }

  importFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/vibrations/import`, formData);
  }

}
