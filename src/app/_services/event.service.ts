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
        return this.http.get<any>(this.baseUrl);
    }

    getEventState(eventId: string) {
        return this.http.get<any>(this.baseUrl + '/' + eventId);
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

    getEventType(eventId: string, mod: string, type: string, sex: string) {
        return this.http.get<any>(this.baseUrl + '/modality/' + eventId + '/' + mod + '/' + type + '/' + sex);
    }

    getEventCategory(eventId: string, mod: string, type: string, sex: string, cat: string) {
        return this.http.get<any>(this.baseUrl + '/modality/cat/' + eventId + '/' + mod + '/' + type + '/' + sex + '/' + cat);
    }

    constructor(private http: HttpClient) { }

}
