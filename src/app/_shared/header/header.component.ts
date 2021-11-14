import { Component, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { EventService } from '../../_services/event.service';
import { Eventt } from '../../_models/eventt.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() item: string;
  event = new Eventt('', '', '', '', '', '', '', '', '', '', '');

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getLastEvent();
    $('#' + this.item).toggleClass('active');
  }

  getLastEvent(): void {
    this.eventService.getLastEvent()
      .subscribe(
        data => {
          this.event = data.data;
        },
        error => {
          console.log(error);
        }
      );
  }

}
