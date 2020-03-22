import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Event } from '../_models/event.model';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    baseUrl: string = environment.baseUrl + '/events';
    httpHeaders = new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

    getLastEvent() {
        return this.http.get<any>(this.baseUrl + '/lastone');
    }

    getEvents() {
        return this.http.get<any>(this.baseUrl + '/', { headers: this.httpHeaders });
    }

    saveEvent(event: Event) {
        return this.http.post(this.baseUrl + '/register', event, { headers: this.httpHeaders });
    }

    updateEvent(event: Event) {
        return this.http.put(this.baseUrl + '/update', event, { headers: this.httpHeaders });
    }

    constructor(private http: HttpClient) { }

}