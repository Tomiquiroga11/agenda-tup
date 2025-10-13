import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss'
})
export class LoggedLayout {
  authService = inject(Auth)

  abrirModal() {
    Swal.fire({
      title: "Quiere cerrar sesion?",
      showDenyButton: false,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "var(--color-error)",
      confirmButtonText: "Cerrar sesion",
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      } 
    });
  }
}
