import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EldenDetailResponse, EldenListResponse } from '../models/elden.model';

@Injectable({ providedIn: 'root' })
export class EldenRingService {
  private http = inject(HttpClient);
  private baseUrl = 'https://eldenring.fanapis.com/api';

  /** La API pagina desde la página 0. `name` filtra por nombre. */
  getList(category: string, page = 0, limit = 24, name = ''): Observable<EldenListResponse> {
    let params = new HttpParams().set('limit', limit).set('page', page);
    if (name) params = params.set('name', name);
    return this.http.get<EldenListResponse>(`${this.baseUrl}/${category}`, { params });
  }

  getById(category: string, id: string): Observable<EldenDetailResponse> {
    return this.http.get<EldenDetailResponse>(`${this.baseUrl}/${category}/${id}`);
  }
}
