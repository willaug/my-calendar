import { Observable } from 'rxjs';
import { SignUp, SignUpResponse } from '@interfaces/sign-up';
import { Injectable } from '@angular/core';
import { SignUpApiService } from './api/sign-up-api.service';

@Injectable({ providedIn: 'root' })
export class DialogSignUpService {
  public constructor(private signUpApiService: SignUpApiService) { }

  public signUp(signUpForm: SignUp): Observable<SignUpResponse> {
    return this.signUpApiService.signUp({
      ...signUpForm,
      language: navigator.language.includes('pt') ? 'pt_br' : 'en',
    });
  }
}
