import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

import { Event } from '../../_models/event.model';
import { EventService } from '../../_services/event.service';
import { EnrollmentService } from '../../_services/enrollment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  event = new Event('', '', '');
  events: Event[];
  confirmEnrollment: string;
  enrollmentInProgress: string;
  totalEnrollment: string;

  constructor(private eventService: EventService,
    private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
    this.getLastEvent();
    this.getEvents();
  }

  getLastEvent(): void {
    this.eventService.getLastEvent()
      .subscribe(
        data => {
          this.event = data.event;
          this.getConfirmEnrollments();
          this.getEnrollmentsInProgress();
          this.getTotalEnrollments();
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }

  getEvents(): void {
    this.eventService.getEvents()
      .subscribe(
        response => {
          this.events = response.data;
          for (let event of this.events) {
            $('#event').append('<option value="' + event.number + '">Edición Nro.' + event.number + '</option>');
          };
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }

  getTotalEnrollments(): void {
    this.enrollmentService.getTotalEnrollments(this.event.number)
      .subscribe(
        response => {
          this.totalEnrollment = response.data.length;
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }

  getConfirmEnrollments(): void {
    this.enrollmentService.getConfirmEnrollments(this.event.number)
      .subscribe(
        response => {
          this.confirmEnrollment = response.data.length;
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }

  getEnrollmentsInProgress(): void {
    this.enrollmentService.getEnrollmentsInProgress(this.event.number)
      .subscribe(
        response => {
          this.enrollmentInProgress = response.data.length;
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }

  onUpdateForm(): void {
    this.eventService.updateEvent(this.event)
      .pipe()
      .subscribe(
        response => {
          Swal.fire('success', 'Evento actualizado con éxito', 'success');
        },
        error => {
          if (error.statusText == 'Unknown Error') {
            Swal.fire('Error', 'No se puede actualizar el evento. Intente más tarde', 'error');
          } else {
            Swal.fire('Error', error.error.message, 'error');
          }
        });
  }

  onDownload(): void {
    this.enrollmentService.getTotalEnrollments(this.event.number)
      .pipe()
      .subscribe(
        response => {
          console.log(response.data);
        },
        error => {
          if (error.statusText == 'Unknown Error') {
            Swal.fire('Error', 'No se puede descargar inscripciones. Intente más tarde', 'error');
          } else {
            Swal.fire('Error', error.error.message, 'error');
          }
        });
  }

}
