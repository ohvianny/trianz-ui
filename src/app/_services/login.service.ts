import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user.model';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    baseUrl: string = environment.baseUrl + '/auth';

    postLogin(user: User) {
        return this.http.post<any>(this.baseUrl + '/login', user);
    }

    constructor(private http: HttpClient) { }

}