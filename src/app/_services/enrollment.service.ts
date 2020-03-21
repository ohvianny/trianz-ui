import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Enrollment } from '../_models/enrollment.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EnrollmentService {

    baseUrl: string = environment.baseUrl + '/enrollments';
    httpHeaders = new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

    getTotalEnrollments(eventId: string) {
        return this.http.get<any>(this.baseUrl + '/total/' + eventId, { headers: this.httpHeaders });
    }

    getConfirmEnrollments(eventId: string) {
        return this.http.get<any>(this.baseUrl + '/confirmed/' + eventId, { headers: this.httpHeaders });
    }

    getEnrollmentsInProgress(eventId: string) {
        return this.http.get<any>(this.baseUrl + '/in-progress/' + eventId, { headers: this.httpHeaders });
    }

    postEnrollment(enrollment: Enrollment) {
        return this.http.post(this.baseUrl + '/register', enrollment);
    }

    constructor(private http: HttpClient) { }

}