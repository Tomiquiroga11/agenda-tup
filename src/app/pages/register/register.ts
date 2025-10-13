import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormUser } from '../../interfaces/user';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  isRegistering = false;
  errorRegister = false;

  userService = inject(UsersService);
  router = inject(Router);

  async register(form: FormUser) {
    this.errorRegister = false;
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.password2 ||
      form.password !== form.password2
    ) {
      this.errorRegister = true;
      return;
    }

    this.isRegistering = true;

    const ok = await this.userService.register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });

    this.isRegistering = false;

    if (ok) {
      this.router.navigate(['/login']);
    } else {
      this.errorRegister = true;
    }
  }
}