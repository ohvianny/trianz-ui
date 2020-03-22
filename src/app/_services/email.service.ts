import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from '../_models/email.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseUrl: string = environment.baseUrl + '/emails';

  postEmail(email: Email) {
    return this.http.post(this.baseUrl + '/send', email);
  }

  constructor(private http: HttpClient) { }
}

