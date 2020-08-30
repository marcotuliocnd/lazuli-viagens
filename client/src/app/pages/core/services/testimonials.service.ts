import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Data {
  _id: string;
  name: string;
  title: string;
  description: string;
  image_url: string;
}

export interface IResponse {
  success?: boolean;
  data?: Data[];
}

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  constructor(private http: HttpClient) { }

  list(): Observable<IResponse> {
    return this.http.get(`${environment.apiUrl}/testimonials`);
  }

  store(body): Observable<IResponse> {
    return this.http.post(`${environment.apiUrl}/testimonials`, body);
  }

  update(id: string, body): Observable<IResponse> {
    return this.http.patch(`${environment.apiUrl}/testimonials/${id}`, body);
  }

  delete(id: string): Observable<IResponse> {
    return this.http.delete(`${environment.apiUrl}/testimonials/${id}`);
  }
}
