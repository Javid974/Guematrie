import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { InnerVibrationResult } from "src/models/innerVibrationResult.model";
import { Tarot } from "src/models/tarot.model";

@Injectable({
    providedIn: 'root'
  })

  export class TarotService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }
    
    getAll(): Observable<any> {
        return this.http.get(`${this.apiUrl}/tarots`);
      }

    saveTarotCards(formData: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl}/tarots`, formData);
    }

    getCardById(id: string | null): Observable<Tarot> {
      return this.http.get<Tarot>(`${this.apiUrl}/tarots/${id}`);
    }

    updateCard(card: Tarot): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}/tarots/${card.id}`, card);
    }

    delete(id : string) : Observable<any> {
      return this.http.delete(`${this.apiUrl}/tarots/${id}`);
    }
  
  }