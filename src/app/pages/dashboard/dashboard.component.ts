import { Component, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

import { Eventt } from '../../_models/eventt.model';
import { EventService } from '../../_services/event.service';
import { EnrollmentService } from '../../_services/enrollment.service';
import { ExcelService } from '../../_shared/excel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
export class DashboardComponent implements OnInit {

  title = 'exportExcelInAngular';
  data: any = [];

  event = new Eventt('', '', '', '', '', '', '', '', '', '', '');
  events: Eventt[];
  confirmEnrollment: string;
  enrollmentInProgress: string;
  totalEnrollment: string;
  rejectedEnrollment: string;

  constructor(private eventService: EventService,
    private enrollmentService: EnrollmentService,
    private excelService: ExcelService) { }

  ngOnInit(): void {
    this.getLastEvent();
    this.getEvents();
  }

  getLastEvent(): void {
    this.eventService.getLastEvent()
      .subscribe(
        data => {
          this.event = data.data;
          this.getConfirmEnrollments();
          this.getEnrollmentsInProgress();
          this.getTotalEnrollments();
          this.getRejectedEnrollments();
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }

  getEvents(): void {
    this.eventService.getEventList()
      .subscribe(
        response => {
          this.events = response.data;
          for (const event of this.events) {
            $('#event').append('<option value="' + event._id + '">' + event.type + ' - ' + event.title + '</option>');
          }
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }

  getTotalEnrollments(): void {
    this.enrollmentService.getTotalEnrollments(this.event._id)
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
    this.enrollmentService.getConfirmEnrollments(this.event._id)
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
    this.enrollmentService.getEnrollmentsInProgress(this.event._id)
      .subscribe(
        response => {
          this.enrollmentInProgress = response.data.length;
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }

  getRejectedEnrollments(): void {
    this.enrollmentService.getRejectedEnrollments(this.event._id)
      .subscribe(
        response => {
          this.rejectedEnrollment = response.data.length;
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
          if (error.statusText === 'Unknown Error') {
            Swal.fire('Error', 'No se puede actualizar el evento. Intente más tarde', 'error');
          } else {
            Swal.fire('Error', error.error.message, 'error');
          }
        });
  }

  onDownload(): void {
    this.enrollmentService.getTotalEnrollments(this.event._id)
      .pipe()
      .subscribe(
        response => {
          console.log(response.data);
          this.excelService.exportAsExcelFile(response.data, 'trianz-inscripciones');
        },
        error => {
          if (error.statusText === 'Unknown Error') {
            Swal.fire('Error', 'No se puede descargar inscripciones. Intente más tarde', 'error');
          } else {
            Swal.fire('Error', error.error.message, 'error');
          }
        });
  }

}
