import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationRequest } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';
import { register } from '../../services/fn/authentication/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerRequest: RegistrationRequest = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };
  errorMsg: Array<string> = [];

  passwordConfirm: string = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  register() {
    if (this.registerRequest.password == this.passwordConfirm) {
      this.errorMsg = [];
      this.authService
        .register({
          body: this.registerRequest,
        })
        .subscribe({
          next: (res) => {
            this.router.navigate(['activate-account']);
          },
          error: (err) => {
            console.log(err);
            if (err.error.validationErrors) {
              this.errorMsg = err.error.validationErrors;
            } else {
              this.errorMsg.push(err.error.error);
            }
          },
        });
    }
    {
      this.errorMsg.push('Both password should be equals');
    }
  }
  login() {
    this.router.navigate(['login']);
  }
}
