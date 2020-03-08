import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Email } from '../_models/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseUrl: string = 'http://127.0.0.1:3000/emails';
  // baseUrl: string = environment.baseUrl;

  postEmail(email: Email) {
    return this.http.post(this.baseUrl + "/send", email);
  }

  constructor(private http: HttpClient) { }
}
