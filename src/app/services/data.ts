import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable ({
  providedIn: 'root'
})
export class DataService {
  private apiUrl1 = 'http://localhost:8000/api/historico';

  constructor(private http: HttpClient) { }

  getHistorico(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl1);
  }
}
