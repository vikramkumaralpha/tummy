import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';
import { ErrorHandelerService } from 'src/app/error-handeler.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient, private errorHandeler: ErrorHandelerService) { }


    checkUsernameAvailability(userName: string): Observable<boolean> {
        const url = "http://localhost:3334/signup/" + userName;

        return this.http.get<boolean>(url, { headers: this.headers })
            .pipe(catchError(this.errorHandeler.handleError));
    }

    register(user: User): Observable<string> {

        const url = "http://localhost:3334/signup/register";
        return this.http.post<string>(url, user, { headers: this.headers, responseType: 'text' as 'json' })
            .pipe(catchError(this.errorHandeler.handleError))
    }

}