import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../_models/user.model';
import { LoginService } from '../../_services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User('', '');

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.loginService.postLogin(this.user)
      .pipe()
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['dashboard']);
        },
        error => {
          if (error.statusText === 'Unknown Error') {
            Swal.fire('Error', 'No se puede hacer login. Intente más tarde', 'error');
          } else {
            Swal.fire('Error', error.error.message, 'error');
          }
        });
  }

}
