import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ExternalVibrationResult } from "src/models/externalVibrationResult.model";
import { InnerVibrationResult } from "src/models/innerVibrationResult.model";

@Injectable({
    providedIn: 'root'
  })

  export class GuematrieService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }
    
    generateInner(firstName: string): Observable<InnerVibrationResult> {
        return this.http.get<InnerVibrationResult>(`${this.apiUrl}/guematrie/inner/${firstName}`);
    }

    generateExternal(lastName: string): Observable<ExternalVibrationResult> {
        return this.http.get<ExternalVibrationResult>(`${this.apiUrl}/guematrie/external/${lastName}`);
    }
  }
