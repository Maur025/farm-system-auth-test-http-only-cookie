import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../loggin/loggin.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private readonly httpClient = inject(HttpClient);

  private baseUrl = 'http://localhost:7783/api/farm';

  public findAllActivities(): Observable<BaseResponse<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('session') || ''}`,
    });

    return this.httpClient.get<BaseResponse<any>>(`${this.baseUrl}/activities`, { headers });
  }
}
