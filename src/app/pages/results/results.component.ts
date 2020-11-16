import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

import { Time } from '../../_models/time.model';
import { Event } from '../../_models/event.model';
import { Enrollment } from '../../_models/enrollment.model';
import { EventService } from '../../_services/event.service';
import { EnrollmentService } from '../../_services/enrollment.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  event = new Event('', '', '', '', '', '', '', '', '', '', '');
  enrollments = [];
  enrollmentId = '';
  dni = '';
  showModal = true;
  duatlon = 'Triatlon';
  time = new Time('', '', '', '', '', '', '', '', '', '', '', '');
  validateTime = true;

  constructor(private router: Router, private enrollmentService: EnrollmentService, private eventService: EventService) { }

  ngOnInit(): void {
    this.getLastEvent();
  }

  getLastEvent(): void {
    this.eventService.getLastEvent()
      .subscribe(
        data => {
          this.event = data.event;
          if (this.event.state != 'Resultado') this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      );
  }

  onSearchEnrollment(): void {
    this.enrollments = [];
    this.enrollmentService.getEnrollment(this.enrollmentId)
      .subscribe(
        response => {
          if (response.data != null) {
            this.enrollments.push(response.data);
          } else {

          }
        },
        error => {
          this.enrollments = [];
          console.log(error);
        }
      );
  }

  onRegisterTime(): void {
    this.enrollmentId = '';
    this.dni = '';
    this.showModal = false;
    this.time = new Time('', '', '', '', '', '', '', '', '', '', '', '');
  }

  onBlur(): void {
    if (this.enrollmentId != '' && this.dni != '') {
      this.enrollmentService.getEnrollmentByIdAndDni(this.enrollmentId, this.dni)
        .subscribe(
          response => {
            if (response.data != null)
              this.duatlon = response.data;
          },
          error => {
            this.enrollments = [];
            console.log(error);
          }
        );
    }
  }

  onSaveRegisterTime(): void {
    let validations = true;

    this.validate(this.enrollmentId, 'enrollmentId');
    this.validate(this.dni, 'dni');
    this.validate(this.time.t12, 't12');
    this.validate(this.time.t13, 't13');
    this.validate(this.time.t22, 't22');
    this.validate(this.time.t23, 't23');
    this.validate(this.time.t32, 't32');
    this.validate(this.time.t33, 't33');
    this.validate(this.time.t1file, 't1file');
    this.validate(this.time.t2file, 't2file');
    this.validate(this.time.t3file, 't3file');

    if (this.enrollmentId != '' && this.dni != '' && this.time.t12 != '' && this.time.t13 != ''
      && this.time.t1file != '' && this.time.t22 != '' && this.time.t23 != '' && this.time.t32 != ''
      && this.time.t33 != '' && this.time.t2file != '' && this.time.t3file != '') {

      validations = this.validateNumbers(this.time);
      this.validateTime = validations;

      if (validations == true) {
        this.time.t11 = this.padLeadingZeros(this.time.t11);
        this.time.t12 = this.padLeadingZeros(this.time.t12);
        this.time.t13 = this.padLeadingZeros(this.time.t13);
        this.time.t21 = this.padLeadingZeros(this.time.t21);
        this.time.t22 = this.padLeadingZeros(this.time.t22);
        this.time.t23 = this.padLeadingZeros(this.time.t23);
        this.time.t31 = this.padLeadingZeros(this.time.t31);
        this.time.t32 = this.padLeadingZeros(this.time.t32);
        this.time.t33 = this.padLeadingZeros(this.time.t33);

        let segs = (parseInt(this.time.t13) + parseInt(this.time.t23) + parseInt(this.time.t33)) / 60;
        let splitTime = segs.toString().split(".");
        segs = Math.round(parseFloat("0." + splitTime[1]) * 60);

        let mins = (parseInt(this.time.t12) + parseInt(this.time.t22) + parseInt(this.time.t32) + parseInt(splitTime[0])) / 60;
        splitTime = mins.toString().split(".");
        mins = Math.round(parseFloat("0." + splitTime[1]) * 60);

        let hrs = parseInt(this.time.t11) + parseInt(this.time.t21) + parseInt(this.time.t31) + parseInt(splitTime[0]);

        let enrollTime = new Enrollment(this.enrollmentId, '', '', this.dni, '', '', '', '', '', '', '', '', '', '', '', '', '',
          this.padLeadingZeros(hrs) + this.padLeadingZeros(mins) + this.padLeadingZeros(segs),
          this.time.t11 + ":" + this.time.t12 + ":" + this.time.t13,
          this.time.t21 + ":" + this.time.t22 + ":" + this.time.t23,
          this.time.t31 + ":" + this.time.t32 + ":" + this.time.t33, '', '', '', '');

        this.enrollmentService.postEnrollTime(enrollTime)
          .pipe()
          .subscribe(
            response => {
              this.showModal = true;
              Swal.fire('success', 'Resultado enviado con éxito', 'success');
            },
            error => {
              this.showModal = true;
              if (error.statusText === 'Unknown Error') {
                Swal.fire('Error', 'No se puede guardar su tiempo. Intente más tarde', 'error');
              } else {
                Swal.fire('Error', error.error.message, 'error');
              }
            });
      }
    }
  }

  validateNumbers(time: Time): boolean {
    if ((parseInt(time.t11) >= 0 && parseInt(time.t11) <= 59) || time.t11 == null || time.t11 == "") {
      if (parseInt(time.t12) >= 0 && parseInt(time.t12) <= 59) {
        if (parseInt(time.t13) >= 0 && parseInt(time.t13) <= 59) {
          if ((parseInt(time.t21) >= 0 && parseInt(time.t21) <= 59) || time.t21 == null || time.t21 == "") {
            if (parseInt(time.t22) >= 0 && parseInt(time.t22) <= 59) {
              if (parseInt(time.t23) >= 0 && parseInt(time.t23) <= 59) {
                if ((parseInt(time.t31) >= 0 && parseInt(time.t31) <= 59) || time.t31 == null || time.t31 == "") {
                  if (parseInt(time.t32) >= 0 && parseInt(time.t32) <= 59) {
                    if (parseInt(time.t33) >= 0 && parseInt(time.t33) <= 59) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  validate(field: string, id: string): void {
    if (field === '') {
      $('#' + id).addClass('border-red');
    } else {
      $('#' + id).removeClass('border-red');
    }
  }

  padLeadingZeros(num) {
    var s = num + "";
    while (s.length < 2) s = "0" + s;
    return s;
  }

  closeModal(): void {
    this.showModal = true;
  }

}
