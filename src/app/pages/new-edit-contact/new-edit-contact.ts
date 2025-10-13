import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../../services/contacts-service';
import { Router, RouterModule } from '@angular/router';
import { Contact, NewContact } from '../../interfaces/contacto';

@Component({
  selector: 'app-new-edit-contact',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.scss'
})
export class NewEditContact implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router)
  errorEnBack = false;
  idContacto = input<string>();
  contactoBack:Contact | undefined = undefined;
  form = viewChild<NgForm>("newContactForm");

  isSaving = false;

  async ngOnInit() {
  }

  async handleFormSubmission(form:NgForm){
    if (form.invalid) return;

    this.isSaving = true;
    this.errorEnBack = false;

    const nuevoContacto: NewContact ={
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number,
      company: form.value.company,
      isFavorite: form.value.isFavourite || false
    }

    let res;
    if(this.idContacto()){
      res = await this.contactsService.editContact({...nuevoContacto,id:this.contactoBack!.id});
    } else {
      res = await this.contactsService.createContact(nuevoContacto);
    }

    this.isSaving = false;

    if(!res) {
      this.errorEnBack = true;
      return;
    };
    this.router.navigate(["/contacts",res.id]);
  }
}