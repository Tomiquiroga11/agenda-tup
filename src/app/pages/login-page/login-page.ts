import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  authService = inject(Auth);
  router = inject(Router);

  errorLogin = false;
  isLoggingIn = false;

  async login(form: NgForm){
    this.errorLogin = false;

    if (form.invalid) {
      return;
    }

    this.isLoggingIn = true;

    const loginResult = await this.authService.login(form.value);

    this.isLoggingIn = false;

    if(loginResult) {
      this.router.navigate(["/"]);
    } else {
      this.errorLogin = true;
    }
  }
}
