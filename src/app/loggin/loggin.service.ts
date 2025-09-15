import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export type User = {
  name: string;
  lastName?: string;
  username: string;
  createOn?: Date;
};

export type LogginResponse = {
  access_token: string;
  expires_in: number;
  refresh_expires_in?: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

export type BaseResponse<T> = {
  code: number;
  data: T;
  message: string;
  pagination?: {
    count: number;
    page: number;
  };
};

@Injectable({
  providedIn: 'root',
})
export class LogginService {
  private baseUrl = 'http://172.20.50.60:7785/realms/farm-auth';
  private readonly httpClient = inject(HttpClient);

  public findAllUsers(): Observable<BaseResponse<User[]>> {
    return this.httpClient.get<BaseResponse<User[]>>(`${this.baseUrl}/users`);
  }

  public loggin(postData: {
    username: string | null;
    password: string | null;
  }): Observable<LogginResponse> {
    return this.httpClient.post<LogginResponse>(
      `${this.baseUrl}/protocol/openid-connect/token?grant_type=password`,
      postData,
      { withCredentials: true }
    );
  }

  public refreshToken(): Observable<LogginResponse> {
    return this.httpClient.post<LogginResponse>(
      `${this.baseUrl}/protocol/openid-connect/token?grant_type=refresh_token`,
      null,
      {
        withCredentials: true,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        }),
      }
    );
  }
}
