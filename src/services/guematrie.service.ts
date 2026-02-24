import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { VibrationResult } from "src/models/vibrationResult.model";

@Injectable({
    providedIn: 'root'
  })

  export class GuematrieService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }
    
    generate(prenom: string): Observable<VibrationResult> {
        return this.http.get<VibrationResult>(`${this.apiUrl}/guematrie/${prenom}`);
    }
  }
