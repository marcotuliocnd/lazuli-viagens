import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Role {
  deleted: boolean;
  slug_history: string[];
  _id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Data {
  deleted: boolean;
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  cpf: string;
  rg: string;
  birthdate_at: Date;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  avatar_url?: any;
  id: string;
}

export interface IResponse {
  success?: boolean;
  data?: Data[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) { }

  list(page = 1): Observable<IResponse> {
    return this.http.get(`${environment.apiUrl}/users?page=${page}`);
  }

  store(data: object): Observable<IResponse> {
    return this.http.post(`${environment.apiUrl}/users`, data);
  }

  update(data: object, id: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/users/${id}`, data);
  }
}
