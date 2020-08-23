import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Data {
  _id: string;
  deleted: boolean;
  from: string;
  to: string;
  started_at: Date;
  finished_at: Date;
  payment_at: Date;
  payment_method: string;
  value: number;
  user_id: any;
  createdAt: Date;
  updatedAt: Date;
  more: string;
  __v: number;
  id: string;
}

export interface IResponse {
  success?: boolean;
  data?: Data[];
}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpClient) { }

  list(page = 1): Observable<IResponse> {
    return this.http.get(`${environment.apiUrl}/trips?page=${page}`);
  }

  store(data: object): Observable<IResponse> {
    return this.http.post(`${environment.apiUrl}/trips`, data);
  }

  update(data: object, id: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/trips/${id}`, data);
  }
}
