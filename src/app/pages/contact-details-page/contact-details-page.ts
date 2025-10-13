import { Component, inject, input, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts-service';
import { Router, RouterModule } from '@angular/router';
import { Contact } from '../../interfaces/contacto';
import Swal from 'sweetalert2';
import { Toast } from '../../utils/modals';

@Component({
  selector: 'app-contact-details-page',
  standalone: true, 
  imports: [RouterModule],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss'
})
export class ContactDetailsPage implements OnInit {
  idContacto = input.required<string>();
  readonly contactService = inject(ContactsService);
  contacto: Contact | undefined;
  cargandoContacto = false;
  router = inject(Router);

  async ngOnInit() {
    if(this.idContacto()){
      this.contacto = this.contactService.contacts.find(contacto => contacto.id.toString() === this.idContacto());
      if(!this.contacto) this.cargandoContacto = true;
      const res = await this.contactService.getContactById(this.idContacto());
      if(res) this.contacto = res;
      this.cargandoContacto = false;
    }
  }

  async toggleFavorite(){
    if(this.contacto){
      const res = await this.contactService.setFavourite(this.contacto.id);
      if(res) this.contacto.isFavorite = !this.contacto.isFavorite;
    }
  }

  async deleteContact(){
    if(this.contacto){
      Swal.fire({
        title: "Borrar contacto",
        text: `¿Estás seguro de que deseas eliminar a ${this.contacto.firstName}? El borrado es permanente.`,
        showCancelButton: true,
        confirmButtonColor: "#e74c3c", // Rojo
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, borrar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await this.contactService.deleteContact(this.contacto!.id);
          if(res){
            Toast.fire({
              icon: "success",
              title: "Contacto eliminado"
            });
            this.router.navigate(['/']);
          }
        }
      });
    }
  }
}