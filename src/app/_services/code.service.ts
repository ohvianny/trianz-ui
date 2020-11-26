import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CodeService {

    baseUrl: string = environment.baseUrl + '/codes';

    getValidCode(code: string, trianzId: string) {
        return this.http.get<any>(this.baseUrl + '/' + trianzId + '/' + code);
    }

    constructor(private http: HttpClient) { }

}