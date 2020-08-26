import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) { }

  send(data: object): Observable<any> {
    return this.http.post(`${environment.apiUrl}/contact`, data);
  }
}