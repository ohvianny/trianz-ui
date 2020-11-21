import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Eventt } from '../_models/eventt.model';

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

    getEventList() {
        return this.http.get<any>(this.baseUrl + '/list');
    }

    getEventState(eventId: string) {
        return this.http.get<any>(this.baseUrl + '/state/' + eventId);
    }

    getEvents() {
        return this.http.get<any>(this.baseUrl + '/', { headers: this.httpHeaders });
    }

    saveEvent(event: Eventt) {
        return this.http.post(this.baseUrl + '/register', event, { headers: this.httpHeaders });
    }

    updateEvent(event: Eventt) {
        return this.http.put(this.baseUrl + '/update', event, { headers: this.httpHeaders });
    }

    getEventModality(eventId: string, mod: string, sex: string) {
        return this.http.get<any>(this.baseUrl + '/modality/' + eventId + '/' + mod + '/' + sex);
    }

    constructor(private http: HttpClient) { }

}
