import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })

  export class GuematrieService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }
    
    generate(prenom: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/guematrie/${prenom}`);
    }
  }