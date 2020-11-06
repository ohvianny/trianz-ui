import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

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
  enrollTime = Enrollment;
  showModal = true;

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
          if (response.data != null)
            this.enrollments.push(response.data);
        },
        error => {
          this.enrollments = [];
          console.log(error);
        }
      );
  }

  onRegisterTime(): void {

    let enrollment: Enrollment;
    this.showModal = false;
  }

  closeModal(): void {
    this.showModal = true;
  }

}
