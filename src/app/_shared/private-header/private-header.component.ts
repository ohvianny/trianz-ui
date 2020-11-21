import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-private-header',
  templateUrl: './private-header.component.html',
  styleUrls: ['./private-header.component.css']
})
export class PrivateHeaderComponent implements OnInit {

  @Input() item: string;
  token: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    $('#' + this.item).toggleClass('active');
    this.token = localStorage.getItem('token').split('.')[1];
    this.token = JSON.parse(atob(this.token));
    if (this.token === undefined || this.token === '' || this.token === null) {
      Swal.fire({
        title: 'Error',
        text: 'Debe iniciar sesión',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        this.router.navigate(['/login']);
      });
    } else {
      $('#' + this.item).toggleClass('active');
    }
  }

}
