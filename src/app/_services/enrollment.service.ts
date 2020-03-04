import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Enrollment } from '../_models/enrollment.model';

@Injectable({
    providedIn: 'root'
})
export class EnrollmentService {

    baseUrl: string = 'http://127.0.0.1:3000/enrollments';
    // baseUrl: string = environment.baseUrl;

    getEnrollments() {
        return this.http.get(this.baseUrl + "/");
    }

    postEnrollment(enrollment: Enrollment) {
        return this.http.post(this.baseUrl + "/register", enrollment);
    }

    constructor(private http: HttpClient) { }

}