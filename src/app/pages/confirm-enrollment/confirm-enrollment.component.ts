import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Event } from '../../_models/event.model';
import { EventService } from '../../_services/event.service';
import { Enrollment } from '../../_models/enrollment.model';
import { EnrollmentService } from '../../_services/enrollment.service';

@Component({
  selector: 'app-confirm-enrollment',
  templateUrl: './confirm-enrollment.component.html',
  styleUrls: ['./confirm-enrollment.component.css']
})
export class ConfirmEnrollmentComponent implements OnInit {

  event = new Event('', '', '', '', '', '', '', '', '', '', '');
  enrollments: Enrollment[];
  active = 1;

  constructor(private eventService: EventService, private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
    this.getLastEvent();
  }

  getLastEvent(): void {
    this.eventService.getLastEvent()
      .subscribe(
        data => {
          this.event = data.event;
          this.getEnrollmentsByEventId();
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }

  getEnrollmentsByEventId(): void {
    this.enrollmentService.getEnrollmentsInProgress(this.event._id)
      .subscribe(
        response => {
          this.enrollments = response.data;
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }

  acceptEnrollment(enrollmentId: string): void {
    Swal.fire({
      title: 'Confirmar inscripción',
      text: '¿Seguro que aprueba esta inscripción?',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.enrollmentService.updateConfirmEnrollment(enrollmentId, 'Aprobado')
          .subscribe(
            response => {
              Swal.fire('success', 'Inscripción aceptada con éxito.', 'success');
              this.getEnrollmentsByEventId();
            },
            error => {
              Swal.fire('Error', error.error.message, 'error');
            }
          );
      }
    });
  }

  cancelEnrollment(enrollmentId: string): void {
    Swal.fire({
      title: 'Rechazar inscripción',
      text: '¿Seguro que desea rechazar esta inscripción?',
      icon: 'info',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.enrollmentService.updateConfirmEnrollment(enrollmentId, 'Rechazado')
          .subscribe(
            response => {
              Swal.fire('success', 'Inscripción rechazada.', 'success');
            },
            error => {
              Swal.fire('Error', error.error.message, 'error');
            }
          );
      }
    });
  }

}
