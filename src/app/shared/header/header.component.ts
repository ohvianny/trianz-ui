import { Component, Input, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() item: string;

  constructor() { }

  ngOnInit(): void {
    $('#' + this.item).toggleClass('active');
  }

}
