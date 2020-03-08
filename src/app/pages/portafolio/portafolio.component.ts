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
  }

  onAll(): void {
    this.edition = false;
    this.team = false;
  }

  on11(): void {
    this.edition = false;
    this.team = true;
  }

  onTeam(): void {
    this.edition = true;
    this.team = false;
  }

}
