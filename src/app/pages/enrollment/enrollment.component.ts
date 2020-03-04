import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../_services/enrollment.service';
import { Enrollment } from '../../_models/enrollment.model';
import * as $ from "jquery";

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  enrollments: Enrollment[];
  enrollment = new Enrollment('', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

  constructor(private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
    // this.getEnrollments();
    (<any>$('#ibirthdate')).datetimepicker({
      icons: {
        time: "icon-clock",
        date: "icon-calendar",
        up: "icon-angle-up",
        down: "icon-angle-down"
      },
      locale: 'es',
      format: 'DD-MM-YYYY'
    });
  }

  getEnrollments(): void {
    this.enrollmentService.getEnrollments()
      .pipe()
      .subscribe(
        response => {
          // this.enrollments = response;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  onSaveForm(): void {
    let validations = true;
    if (this.enrollment.name == '') { $("#name").addClass("border-red"); }
    else {
      $("#name").removeClass("border-red");
    }
    if (this.enrollment.lastname == '') { $("#lastname").addClass("border-red"); }
    if (this.enrollment.dni == '') { $("#dni").addClass("border-red"); }
    if (this.enrollment.email == '') { $("#email").addClass("border-red"); }
    if (this.enrollment.telephone == '') { $("#telephone").addClass("border-red"); }
    if (this.enrollment.sex == '') { $("#sex").addClass("border-red"); }
    if (this.enrollment.type == '') { $("#type").addClass("border-red"); }
    if (this.enrollment.category == '') { $("#category").addClass("border-red"); }
    if (this.enrollment.bank == '') { $("#bank").addClass("border-red"); }
    if (this.enrollment.bankNumber == '') { $("#bankNumber").addClass("border-red"); }
    if (this.enrollment.amount == '') { $("#amount").addClass("border-red"); }
    if (this.enrollment.cityName == '') { $("#cityName").addClass("border-red"); }
    if (this.enrollment.clubName == '') { $("#clubName").addClass("border-red"); }
    if (this.enrollment.shirtSize == '') { $("#shirtSize").addClass("border-red"); }
    this.enrollment.birthdate = $("#ibirthdate").val();

    if (this.enrollment.name == '' || this.enrollment.lastname == '' || this.enrollment.dni == '' ||
      this.enrollment.email == '' || this.enrollment.telephone == '' || this.enrollment.sex == '' ||
      this.enrollment.type == '' || this.enrollment.category == '' ||
      this.enrollment.bank == '' || this.enrollment.bankNumber == '' || this.enrollment.amount == '' ||
      this.enrollment.cityName == '' || this.enrollment.clubName == '' || this.enrollment.shirtSize == '') {
      validations = false;
    }

    if (validations == true) {
      this.enrollmentService.postEnrollment(this.enrollment)
        .pipe()
        .subscribe(
          response => {
            // this.enrollments = response;
            console.log(response);
          },
          error => {
            console.log(error);
          });
    }

  }
}
