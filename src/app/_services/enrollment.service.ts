import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Enrollment } from '../_models/enrollment.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EnrollmentService {

    baseUrl: string = environment.baseUrl + '/enrollments';

    getEnrollments() {
        return this.http.get(this.baseUrl + "/");
    }

    postEnrollment(enrollment: Enrollment) {
        return this.http.post(this.baseUrl + "/register", enrollment);
    }

    constructor(private http: HttpClient) { }

}