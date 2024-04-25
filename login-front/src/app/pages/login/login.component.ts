import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationReques } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  auuthRequest: AuthenticationReques = {
    email: '',
    password: '',
  };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  login() {
    this.errorMsg = [];
    this.authService
      .authenticate({
        body: this.auuthRequest,
      })
      .subscribe({
        next: (res) => {
          ///save token
          this.tokenService.token = res.token as string;
          this.router.navigate(['teste']);
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

  register() {
    this.router.navigate(['register']);
  }
}
