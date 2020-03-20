import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Event } from '../_models/event.model';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    baseUrl: string = environment.baseUrl + '/events';

    getLastEvent() {
        return this.http.get<any>(this.baseUrl + "/lastone");
    }

    constructor(private http: HttpClient) { }

}