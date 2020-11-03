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

    getRejectedEnrollments(eventId: string) {
        return this.http.get<any>(this.baseUrl + '/rejected/' + eventId, { headers: this.httpHeaders });
    }

    postEnrollment(enrollment: Enrollment) {
        return this.http.post(this.baseUrl + '/register', enrollment);
    }

    updateConfirmEnrollment(enrollmentId: string, confirm: string) {
        return this.http.put<any>(this.baseUrl + '/update/' + enrollmentId + '/confirm/' + confirm, {}, { headers: this.httpHeaders });
    }

    getEnrollment(enrollmentId: string) {
        return this.http.get<any>(this.baseUrl + '/' + enrollmentId, { headers: this.httpHeaders });
    }

    updateEnrollmentTime(enrollment: Enrollment) {
        return this.http.put<any>(this.baseUrl + '/update/time/', enrollment);
    }

    constructor(private http: HttpClient) { }

}
