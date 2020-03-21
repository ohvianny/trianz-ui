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

  event = new Event('', '', '');
  enrollments: Enrollment[];

  constructor(private eventService: EventService,
    private enrollmentService: EnrollmentService) { }

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
    this.enrollmentService.getTotalEnrollments(this.event.number)
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

  }

  cancelEnrollment(enrollmentId: string): void {

  }

}
