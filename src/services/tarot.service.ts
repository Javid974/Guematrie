import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { InnerVibrationResult } from "src/models/innerVibrationResult.model";

@Injectable({
    providedIn: 'root'
  })

  export class TarotService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }
    
    getAll(): Observable<any> {
        return this.http.get(`${this.apiUrl}/tarot`);
      }

    saveTarotCards(formData: FormData): Observable<any> {
      return this.http.post(this.apiUrl, formData);
    }
  }