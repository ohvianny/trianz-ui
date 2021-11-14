import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Eventt } from '../../_models/eventt.model';
import { EventService } from '../../_services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event = new Eventt('', '', '', '', '', '', '', '', '', '', '');
  events: Eventt[];
  newOrModify = 'Nuevo';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEventList()
      .subscribe(
        response => {
          this.events = response.data;
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }

  onSaveForm(): void {
    if (this.newOrModify == 'Nuevo') {
      this.eventService.saveEvent(this.event)
        .pipe().subscribe(
          response => {
            this.getEvents();
            Swal.fire('success', 'Evento creado con éxito', 'success');
            this.event = new Eventt('', '', '', '', '', '', '', '', '', '', '');
          },
          error => {
            if (error.statusText === 'Unknown Error') {
              Swal.fire('Error', 'No se puede crear el evento. Intente más tarde', 'error');
            } else {
              Swal.fire('Error', error.error.message, 'error');
            }
          });
    } else {
      this.eventService.updateEvent(this.event)
        .pipe().subscribe(
          response => {
            this.getEvents();
            Swal.fire('success', 'Evento modificado con éxito', 'success');
            this.event = new Eventt('', '', '', '', '', '', '', '', '', '', '');
          },
          error => {
            if (error.statusText === 'Unknown Error') {
              Swal.fire('Error', 'No se puede modificar el evento. Intente más tarde', 'error');
            } else {
              Swal.fire('Error', error.error.message, 'error');
            }
          });
      this.event = new Eventt('', '', '', '', '', '', '', '', '', '', '');
      this.newOrModify = 'Nuevo';
    }
  }

  onEditClick(event: Eventt): void {
    const event2 = new Eventt(event._id, event.type, event.title, event.num, event.price, event.state, event.infoFile, event.genFile, event.date, event.date2, event.description);
    this.event = event2;
    this.newOrModify = 'Modificar';
  }

}
