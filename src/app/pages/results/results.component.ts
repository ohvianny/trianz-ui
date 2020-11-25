import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import * as $ from 'jquery';
import Swal from 'sweetalert2';

import { Time } from '../../_models/time.model';
import { Eventt } from '../../_models/eventt.model';
import { Enrollment } from '../../_models/enrollment.model';
import { EventService } from '../../_services/event.service';
import { EnrollmentService } from '../../_services/enrollment.service';
import { UploadService } from '../../_services/upload.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  event = new Eventt('', '', '', '', '', '', '', '', '', '', '');
  events: Eventt[];
  enrollments = [];
  enrollmentsW = [];
  enrollmentIndividual = [];
  enrollmentId = '';
  modalityId = '';
  eventId = '';
  dni = '';
  typeId = '-';
  categoryId = '-';
  showModal = true;
  enableOnSave = false;
  duatlon = 'Triatlon';
  time = new Time('', '', '', '', '', '', '', '', '', '', '', '');
  validateTime = true;
  file1Obj: File;
  file2Obj: File;
  file3Obj: File;
  enableCategory = true;
  enableType = true;

  // MatPaginator Inputs
  pageIndex: number = 0;
  pageSize: number = 10;
  lowValue: number = 0;
  highValue: number = 10;

  // MatPaginator Inputs
  pageIndexW: number = 0;
  pageSizeW: number = 10;
  lowValueW: number = 0;
  highValueW: number = 10;

  // MatPaginator Output
  pageEvent: PageEvent;
  pageEventW: PageEvent;

  constructor(private router: Router, private enrollmentService: EnrollmentService,
    private eventService: EventService, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  public getPaginatorDataW(event: PageEvent): PageEvent {
    this.lowValueW = event.pageIndex * event.pageSize;
    this.highValueW = this.lowValueW + event.pageSize;
    return event;
  }

  getEvents(): void {
    this.eventService.getEventList()
      .subscribe(
        data => {
          this.events = data.data;
        },
        error => {
          console.log(error);
        }
      );
  }

  onSearchEvent(): void {
    this.event = new Eventt('', '', '', '', '', '', '', '', '', '', '');
    this.eventService.getEventState(this.eventId)
      .subscribe(
        response => {
          if (response.data != null) {
            this.event = response.data;
            this.categoryId = '-';
            this.typeId = '-';
            this.modalityId = '';
            this.enrollmentId = '';
            this.enrollmentIndividual = [];
            this.enrollments = [];
            this.enrollmentsW = [];
          }
        },
        error => {
          this.enrollments = [];
          console.log(error);
        }
      );
  }

  onSearchEnrollment(): void {
    if (this.enrollmentId.length == 4) {
      this.enrollments = [];
      this.enrollmentsW = [];
      this.enrollmentIndividual = [];
      this.enrollmentService.getEnrollment(this.enrollmentId)
        .subscribe(
          response => {
            if (response.data != null) {
              this.enrollmentIndividual.push(response.data);
              this.categoryId = '-';
              this.typeId = '-';
              this.modalityId = '';
            } else {
              Swal.fire('Error', 'No se encuentra dorsal en este evento', 'error');
              this.enrollmentId = '';
              this.enrollments = [];
            }
          },
          error => {
            this.enrollments = [];
            Swal.fire('Error', 'No se encuentra dorsal en este evento', 'error');
            this.enrollmentId = '';
            this.enrollments = [];
          }
        );
    }
  }

  onSearchModality(): void {
    this.enrollments = [];
    this.enrollmentsW = [];
    this.enrollmentIndividual = [];
    this.enrollmentId = '';
    this.eventService.getEventModality(this.eventId, this.modalityId, 'Masculino')
      .subscribe(
        response => {
          if (response.data != null) {
            this.enrollments = response.data;
          }
        },
        error => {
          this.enrollments = [];
          console.log(error);
        }
      );
    this.eventService.getEventModality(this.eventId, this.modalityId, 'Femenino')
      .subscribe(
        response => {
          if (response.data != null) {
            this.enrollmentsW = response.data;
          }
        },
        error => {
          this.enrollmentsW = [];
          console.log(error);
        }
      );
    this.enableType = (this.modalityId == 'Triatlon') ? false : true;
    this.categoryId = '-';
    this.typeId = '-';
    this.enableCategory = false;
  }

  onSearchType(): void {
    this.enrollments = [];
    this.enrollmentsW = [];
    this.enrollmentIndividual = [];
    this.enrollmentId = '';
    if (this.categoryId != '') {
      this.eventService.getEventType(this.eventId, this.modalityId, this.typeId, 'Masculino')
        .subscribe(
          response => {
            if (response.data != null) {
              this.enrollments = response.data;
            }
          },
          error => {
            this.enrollments = [];
            console.log(error);
          }
        );
      this.eventService.getEventType(this.eventId, this.modalityId, this.typeId, 'Femenino')
        .subscribe(
          response => {
            if (response.data != null) {
              this.enrollmentsW = response.data;
            }
          },
          error => {
            this.enrollmentsW = [];
            console.log(error);
          }
        );
    } else {
      this.onSearchCategory();
    }
  }

  onSearchCategory(): void {
    this.enrollments = [];
    this.enrollmentsW = [];
    this.enrollmentIndividual = [];
    this.enrollmentId = '';
    if (this.typeId == '') this.typeId = '-';
    if (this.categoryId == '') this.categoryId = '-';
    this.eventService.getEventCategory(this.eventId, this.modalityId, this.typeId, 'Masculino', this.categoryId)
      .subscribe(
        response => {
          if (response.data != null) {
            this.enrollments = response.data;
          }
        },
        error => {
          this.enrollments = [];
          console.log(error);
        }
      );
    this.eventService.getEventCategory(this.eventId, this.modalityId, this.typeId, 'Femenino', this.categoryId)
      .subscribe(
        response => {
          if (response.data != null) {
            this.enrollmentsW = response.data;
          }
        },
        error => {
          this.enrollmentsW = [];
          console.log(error);
        }
      );
  }

  onRegisterTime(): void {
    this.enrollmentId = '';
    this.dni = '';
    this.showModal = false;
    this.time = new Time('', '', '', '', '', '', '', '', '', '', '', '');
    this.enableOnSave = false;
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
    this.enableOnSave = true;
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
        this.uploadService.fileUpload(this.file1Obj, this.enrollmentId + "-file1");
        this.uploadService.fileUpload(this.file2Obj, this.enrollmentId + "-file2");
        this.uploadService.fileUpload(this.file3Obj, this.enrollmentId + "-file3");

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
          this.time.t31 + ":" + this.time.t32 + ":" + this.time.t33, '', '', '', '', '');

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
      } else {
        this.enableOnSave = false;
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

  onFile1Picked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.file1Obj = FILE;
  }

  onFile2Picked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.file2Obj = FILE;
  }

  onFile3Picked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.file3Obj = FILE;
  }

  onSearchCerticiate(dorsal: string): void {
    let url = environment.baseUrl + '/enrollments/certificate/' + dorsal;
    let pdfName = 'certificado-' + dorsal + '.pdf';

    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
    link.setAttribute('download', pdfName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
