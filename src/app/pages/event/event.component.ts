import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Event } from '../../_models/event.model';
import { EventService } from '../../_services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event = new Event('', '', 0, '');
  events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents()
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
    this.eventService.saveEvent(this.event)
      .pipe()
      .subscribe(
        response => {
          Swal.fire('success', 'Evento creado con éxito', 'success');
          this.getEvents();
          this.event = new Event('', '', 1, '');
        },
        error => {
          if (error.statusText === 'Unknown Error') {
            Swal.fire('Error', 'No se puede crear el evento. Intente más tarde', 'error');
          } else {
            Swal.fire('Error', error.error.message, 'error');
          }
        });
  }

}
