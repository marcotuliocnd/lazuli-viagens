import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Data {
  _id: string;
  name: string;
  slug: string;
}

export interface IResponse {
  success?: boolean;
  data?: Data[];
}

@Injectable({
  providedIn: 'root',
})
export class FidelityService {
  constructor(private http: HttpClient) { }

  list(): Observable<IResponse> {
    return this.http.get(`${environment.apiUrl}/fidelities`);
  }
}
