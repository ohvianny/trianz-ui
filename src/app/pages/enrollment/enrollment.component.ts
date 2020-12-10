import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { CodeService } from '../../_services/code.service';
import { EnrollmentService } from '../../_services/enrollment.service';
import { EventService } from '../../_services/event.service';
import { Enrollment } from '../../_models/enrollment.model';
import { Eventt } from '../../_models/eventt.model';


@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  event = new Eventt('', '', '', '', '', '', '', '', '', '', '');
  terms: boolean = false;
  currentDate: string;
  sex: string;
  category: string;
  enrollment = new Enrollment('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

  modalities = [{ value: '', name: 'Seleccionar' }, { value: 'Triatlon', name: 'Triatlón' }];

  constructor(private router: Router, private enrollmentService: EnrollmentService,
    private eventService: EventService, private codeService: CodeService) { }

  ngOnInit(): void {
    this.sex = '';
    this.category = '';
    this.getLastEvent();
    const dd = new Date();
    this.currentDate = dd.getDate() + '/' + (dd.getMonth() + 1) + '/' + dd.getFullYear();
  }

  onChangeSex(): void {
    if (this.enrollment.sex === 'Masculino') {
      this.sex = 'Masculino';
    } else {
      this.sex = 'Femenino';
    }
  }

  onChangeDate(): void {
    const currentYear = new Date().getFullYear();
    const birthYear = $('#birthdate').val().split('-')[0];

    switch (true) {
      case (birthYear <= (currentYear - 50)):
        this.category = '50+';
        break;
      case (birthYear >= (currentYear - 49) && birthYear <= (currentYear - 45)):
        this.category = '45-49';
        break;
      case (birthYear >= (currentYear - 44) && birthYear <= (currentYear - 40)):
        this.category = '40-44';
        break;
      case (birthYear >= (currentYear - 39) && birthYear <= (currentYear - 35)):
        this.category = '35-39';
        break;
      case (birthYear >= (currentYear - 34) && birthYear <= (currentYear - 30)):
        this.category = '30-34';
        break;
      case (birthYear >= (currentYear - 29) && birthYear <= (currentYear - 25)):
        this.category = '25-29';
        break;
      case (birthYear >= (currentYear - 24) && birthYear <= (currentYear - 18)):
        this.category = '18-24';
        break;
      default:
        this.category = 'Juvenil';
        console.log('invalid numbers');
    }
  }

  getLastEvent(): void {
    this.eventService.getLastEvent()
      .subscribe(
        data => {
          this.event = data.event;
          if (this.event.type === 'Virtual') this.modalities.push({ value: 'Duatlon', name: 'Duatlón' });
          if (this.event.state == 'Activo' || this.event.state == 'Resultado') {
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  validate(field: string, id: string): void {
    if (field === '') {
      $('#' + id).addClass('border-red');
    } else {
      $('#' + id).removeClass('border-red');
    }
  }

  onSaveForm(): void {
    let validations = true;

    if (this.enrollment.type == 'Equipo') {
      this.validate(this.enrollment.swimmingName, 'swimmingName');
      this.validate(this.enrollment.bikeName, 'bikeName');
      this.validate(this.enrollment.walkName, 'walkName');
      if (this.enrollment.swimmingName === '' || this.enrollment.bikeName === '' || this.enrollment.walkName === '') {
        validations = false;
      }
    }
    if (this.enrollment.code == '') {
      this.validate(this.enrollment.modality, 'modality');
      this.validate(this.enrollment.paymentType, 'paymentType');
      this.validate(this.enrollment.paymentDate, 'paymentDate');
      this.validate(this.enrollment.name, 'name');
      this.validate(this.enrollment.lastname, 'lastname');
      this.validate(this.enrollment.dni, 'dni');
      this.validate(this.enrollment.email, 'email');
      this.validate(this.enrollment.telephone, 'telephone');
      this.validate(this.enrollment.sex, 'sex');
      this.validate(this.enrollment.bankNumber, 'bankNumber');
      this.validate(this.enrollment.amount, 'amount');
      this.validate(this.enrollment.cityName, 'cityName');
      this.validate(this.enrollment.category, 'category');
      this.validate(this.enrollment.birthdate, 'birthdate');

      if (this.enrollment.name === '' || this.enrollment.lastname === '' || this.enrollment.dni === '' ||
        this.enrollment.email === '' || this.enrollment.telephone === '' || this.enrollment.sex === '' ||
        this.enrollment.category === '' || this.enrollment.bankNumber === '' || this.enrollment.amount === '' || this.enrollment.cityName === '' ||
        this.enrollment.birthdate === '' || this.enrollment.modality === '' || this.enrollment.paymentType === '') {
        validations = false;
      }

      if (this.enrollment.bank === '' && this.enrollment.paymentType === 'Transferencia') {
        this.validate(this.enrollment.bank, 'bank');
        validations = false;
      }

      if (this.enrollment.type === '' && this.enrollment.modality !== 'Duatlon') {
        this.validate(this.enrollment.type, 'type');
        validations = false;
      }
      // if (this.terms == false && validations == true) {
      //   validations = false;
      //   Swal.fire('Error', 'Debe aceptar los Términos y Condiciones', 'error');
      //   this.validate(this.enrollment.shirtSize, 'shirtSize');
      // }

      if (this.event.type != 'Virtual') {
        this.validate(this.enrollment.shirtSize, 'shirtSize');
        if (this.enrollment.shirtSize === '') {
          validations = false;
        }
      }

      if (validations === true) {
        if (this.enrollment.category !== 'Elite') {
          this.enrollment.category = this.enrollment.category + ' ' + this.category;
        }
        this.enrollment.trianzEvent = this.event._id;
        this.enrollmentService.postEnrollment(this.enrollment)
          .pipe()
          .subscribe(
            response => {
              Swal.fire('success', 'Inscripción realizada con éxito. Le llegará un correo electrónico con su confirmación', 'success');
            },
            error => {
              if (error.statusText === 'Unknown Error') {
                Swal.fire('Error', 'No se puede realizar inscripción. Intente más tarde', 'error');
              } else {
                Swal.fire('Error', error.error.message, 'error');
              }
            });
        this.enrollment = new Enrollment('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
      } else {
        Swal.fire('Error', 'Debe completar todos los campos', 'error');
      }
    } else {

      if (this.enrollment.amount === '' || this.enrollment.paymentType === '' || this.enrollment.bankNumber === '') {
        this.validate(this.enrollment.modality, 'modality');
        this.validate(this.enrollment.name, 'name');
        this.validate(this.enrollment.lastname, 'lastname');
        this.validate(this.enrollment.dni, 'dni');
        this.validate(this.enrollment.email, 'email');
        this.validate(this.enrollment.telephone, 'telephone');
        this.validate(this.enrollment.sex, 'sex');
        this.validate(this.enrollment.cityName, 'cityName');
        this.validate(this.enrollment.category, 'category');
        this.validate(this.enrollment.birthdate, 'birthdate');
        this.validate(this.enrollment.code, 'code');

        if (this.enrollment.name === '' || this.enrollment.lastname === '' || this.enrollment.dni === '' ||
          this.enrollment.email === '' || this.enrollment.telephone === '' || this.enrollment.sex === '' ||
          this.enrollment.category === '' || this.enrollment.cityName === '' || this.enrollment.birthdate === '' ||
          this.enrollment.modality === '' || this.enrollment.code === '') {
          validations = false;
        }

        if (this.enrollment.type === '' && this.enrollment.modality !== 'Duatlon') {
          this.validate(this.enrollment.type, 'type');
          validations = false;
        }
        if (this.event.type != 'Virtual') {
          this.validate(this.enrollment.shirtSize, 'shirtSize');
          if (this.enrollment.shirtSize === '') {
            validations = false;
          }
        }

        if (validations === true) {
          if (this.enrollment.category !== 'Elite') {
            this.enrollment.category = this.enrollment.category + ' ' + this.category;
          }
          this.enrollment.trianzEvent = this.event._id;
          this.enrollment.code = this.enrollment.code.toLowerCase();
          this.codeService.getValidCode(this.enrollment.code, this.event._id)
            .pipe()
            .subscribe(
              response => {
                if (response.data == false) {
                  this.enrollmentService.postEnrollment(this.enrollment)
                    .pipe()
                    .subscribe(
                      response => {
                        Swal.fire('success', 'Inscripción realizada con éxito. Le llegará un correo electrónico con su confirmación', 'success');
                        this.enrollment = new Enrollment('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
                      },
                      error => {
                        this.enrollment = new Enrollment('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
                        if (error.statusText === 'Unknown Error') {
                          Swal.fire('Error', 'No se puede realizar inscripción. Intente más tarde', 'error');
                        } else {
                          Swal.fire('Error', error.error.message, 'error');
                        }
                      });
                } else {
                  Swal.fire('Error', 'Código no disponible, contacte a los organizadores', 'error');
                }
              },
              error => {
                Swal.fire('Error', 'Error en procesar su código, contacte a los organizadores', 'error');
              });
        } else {
          Swal.fire('Error', 'Debe completar todos los campos', 'error');
        }
      } else {
        Swal.fire('Error', 'Si tienes un código promocional no debes llenar los campos de pagos', 'error');
      }
    }
  }

  resetModality(): void {
    this.enrollment.type = '';
  }

  resetBank(): void {
    this.enrollment.bank = '';
  }

}


