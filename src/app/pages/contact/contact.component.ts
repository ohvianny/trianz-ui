import { Component, OnInit } from '@angular/core';

import { EmailService } from '../../_services/email.service';
import { Email } from '../../_models/email.model';

import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  email = new Email('', '', '', '');

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
  }

  validate(field: string, id: string): void {
    if (field == '') {
      $('#' + id).addClass('border-red');
    } else {
      $('#' + id).removeClass('border-red');
    }
  }

  onSaveForm(): void {
    let validations = true;

    this.validate(this.email.name, 'name');
    this.validate(this.email.email, 'email');
    this.validate(this.email.subject, 'subject');
    this.validate(this.email.message, 'message');

    if (this.email.name == '' || this.email.email == '' ||
      this.email.subject == '' || this.email.message == '') {
      validations = false;
    }

    if (validations == true) {
      this.emailService.postEmail(this.email)
        .pipe()
        .subscribe(
          response => {
            Swal.fire('success', 'Correo electrónico enviado con éxito', 'success');
          },
          error => {
            if (error.statusText == 'Unknown Error') {
              Swal.fire('Error', 'No se puede enviar correo. Intente más tarde', 'error');
            } else {
              Swal.fire('Error', error.message, 'error');
            }
          });
    }
  }
}
