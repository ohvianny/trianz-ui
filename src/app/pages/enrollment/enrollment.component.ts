import { Component, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

import { EnrollmentService } from '../../_services/enrollment.service';
import { EventService } from '../../_services/event.service';
import { Enrollment } from '../../_models/enrollment.model';
import { Event } from '../../_models/event.model';


@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class EnrollmentComponent implements OnInit {

  event = new Event('', '', '');
  terms: boolean = false;
  currentDate: string;
  sex: string = '';
  category: string = '';
  enrollment = new Enrollment('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

  constructor(private enrollmentService: EnrollmentService,
    private eventService: EventService) { }

  ngOnInit(): void {
    this.getLastEvent();
    const dd = new Date();
    this.currentDate = dd.getDate() + '/' + (dd.getMonth() + 1) + '/' + dd.getFullYear();
  }

  onChangeSex(): void {
    this.enrollment.sex == 'Masculino' ? this.sex = 'Masculino' : this.sex = 'Femenino';
  }

  onChangeDate(): void {
    const currentYear = new Date().getFullYear();
    const birthYear = $('#birthdate').val().split('/')[2];

    switch (true) {
      case (birthYear <= (currentYear - 50)):
        this.category = '50+';
        break;
      case (birthYear >= (currentYear - 49) && birthYear <= (currentYear - 45)):
        this.category = '45 - 49';
        break;
      case (birthYear >= (currentYear - 44) && birthYear <= (currentYear - 40)):
        this.category = '40 - 44';
        break;
      case (birthYear >= (currentYear - 39) && birthYear <= (currentYear - 35)):
        this.category = '35 - 39';
        break;
      case (birthYear >= (currentYear - 34) && birthYear <= (currentYear - 30)):
        this.category = '30 - 34';
        break;
      case (birthYear >= (currentYear - 29) && birthYear <= (currentYear - 25)):
        this.category = '25 - 29';
        break;
      case (birthYear >= (currentYear - 24) && birthYear <= (currentYear - 18)):
        this.category = '18 - 24';
        break;
      default:
        console.log('invalid numbers');
    }
  }

  getLastEvent(): void {
    this.eventService.getLastEvent()
      .subscribe(
        data => {
          this.event = data.event;
        },
        error => {
          console.log(error);
        }
      );
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

    this.validate(this.enrollment.name, 'name');
    this.validate(this.enrollment.lastname, 'lastname');
    this.validate(this.enrollment.dni, 'dni');
    this.validate(this.enrollment.email, 'email');
    this.validate(this.enrollment.telephone, 'telephone');
    this.validate(this.enrollment.sex, 'sex');
    this.validate(this.enrollment.type, 'type');
    this.validate(this.enrollment.bank, 'bank');
    this.validate(this.enrollment.bankNumber, 'bankNumber');
    this.validate(this.enrollment.amount, 'amount');
    this.validate(this.enrollment.cityName, 'cityName');
    this.validate(this.enrollment.shirtSize, 'shirtSize');
    this.validate(this.enrollment.category, 'category');
    this.validate(this.enrollment.birthdate, 'birthdate');

    if (this.enrollment.name == '' || this.enrollment.lastname == '' || this.enrollment.dni == '' ||
      this.enrollment.email == '' || this.enrollment.telephone == '' || this.enrollment.sex == '' ||
      this.enrollment.type == '' || this.enrollment.category == '' || this.enrollment.bank == '' ||
      this.enrollment.bankNumber == '' || this.enrollment.amount == '' || this.enrollment.cityName == '' ||
      this.enrollment.shirtSize == '' || this.enrollment.birthdate == '') {
      validations = false;
    }

    // if (this.terms == false && validations == true) {
    //   validations = false;
    //   Swal.fire('Error', 'Debe aceptar los Términos y Condiciones', 'error');
    // }

    if (validations == true) {
      if (this.enrollment.category == 'Elite') {
        this.enrollment.category = this.enrollment.category + ' ' + this.sex;
      } else {
        this.enrollment.category = this.enrollment.category + ' ' + this.category;
      }
      this.enrollment.trianzEvent = this.event.number;
      this.enrollmentService.postEnrollment(this.enrollment)
        .pipe()
        .subscribe(
          response => {
            Swal.fire('success', 'Inscripción realizada con éxito. Le llegará un correo electrónico con su confirmación', 'success');
          },
          error => {
            if (error.statusText == 'Unknown Error') {
              Swal.fire('Error', 'No se puede realizar inscripción. Intente más tarde', 'error');
            } else {
              Swal.fire('Error', error.error.message, 'error');
            }
          });
    }
  }

}
