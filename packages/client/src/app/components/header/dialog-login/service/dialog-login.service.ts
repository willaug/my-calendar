import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Login, LoginResponse } from '@interfaces/login';
import { LoginApiService } from './api/login-api.service';

@Injectable({ providedIn: 'root' })
export class DialogLoginService {
  public constructor(public loginApi: LoginApiService) { }

  public login(loginForm: Login): Observable<LoginResponse> {
    return this.loginApi.login(loginForm);
  }

  public setToken(token: string): void {
    localStorage.setItem('MC_AUTH_TOKEN', token);
  }
}
