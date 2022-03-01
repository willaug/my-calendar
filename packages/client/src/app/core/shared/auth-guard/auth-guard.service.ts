import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../token/token.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  public constructor(
    private router: Router,
    private tokenService: TokenService,
  ) { }

  public canActivate(): boolean {
    const isValidToken = this.tokenService.isValidToken();
    if (!isValidToken) {
      this.router.navigateByUrl('/');
    }

    return isValidToken;
  }
}
