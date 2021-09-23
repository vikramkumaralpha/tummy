import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { LoginUser } from '../../model/login-user';
import { AuthToken } from '../../model/auth-token';
import { ErrorHandelerService } from 'src/app/error-handeler.service';

@Injectable()
export class LoginServcie {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient, private errorHandeler: ErrorHandelerService) { }

    login(loginUser: LoginUser): Observable<AuthToken> {
        const url = "http://localhost:3334/authenticate/login";

        var toReturn = this.http.post<AuthToken>(url, loginUser, { headers: this.headers })
            .pipe(catchError(this.errorHandeler.handleError));
        return toReturn;

    }



}