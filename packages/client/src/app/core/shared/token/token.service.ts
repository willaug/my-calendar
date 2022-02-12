import { Injectable } from '@angular/core';
import { AuthToken } from '@interfaces/auth-token';
import { environment } from '@src/environments/environment';
import decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class TokenService {
  public getToken(): string | null {
    return localStorage.getItem(environment.localStorageAuthItemName);
  }

  public setToken(token: string): void {
    localStorage.setItem(environment.localStorageAuthItemName, token);
  }

  public decodeToken(): AuthToken | null {
    const token = this.getToken();
    return token ? decode<AuthToken>(token) : null;
  }

  public isValidToken(): boolean {
    const decodedToken = this.decodeToken();
    const currentTime = new Date().getTime() / 1000;

    return Boolean(decodedToken && decodedToken.exp > currentTime);
  }
}
