import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {

  edition: boolean = false;
  team: boolean = false;

  constructor() { }

  ngOnInit(): void {
    $('#all').addClass('active');
  }

  onAll(): void {
    this.edition = false;
    this.team = false;
    $('#all').addClass('active');
    $('#11').removeClass('active');
    $('#team').removeClass('active');
    $('#hogar').removeClass('active');
  }

  on11(): void {
    this.edition = false;
    this.team = true;
    $('#11').addClass('active');
    $('#all').removeClass('active');
    $('#team').removeClass('active');
    $('#hogar').removeClass('active');
  }

  onTeam(): void {
    this.edition = true;
    this.team = false;
    $('#team').addClass('active');
    $('#all').removeClass('active');
    $('#11').removeClass('active');
    $('#hogar').removeClass('active');
  }

}
