import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { InnerVibrationResult } from "src/models/innerVibrationResult.model";

@Injectable({
    providedIn: 'root'
  })

  export class GuematrieService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }
    
    generate(prenom: string): Observable<InnerVibrationResult> {
        return this.http.get<InnerVibrationResult>(`${this.apiUrl}/guematrie/${prenom}`);
    }
  }