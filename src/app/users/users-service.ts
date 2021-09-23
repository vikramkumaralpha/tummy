import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { User } from '../model/user';
import { catchError } from 'rxjs/operators';
import { ErrorHandelerService } from '../error-handeler.service';


@Injectable()
export class UserService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private httpClient: HttpClient, private errorHandeler: ErrorHandelerService) { }

    BASE_URL: string = "http://localhost:3334/";


    getAllUsers(): Observable<User[]> {

        return this.httpClient.get<User[]>(this.BASE_URL + "all-user", { headers: this.headers })
            .pipe(catchError(this.errorHandeler.handleError));

    }
    getUserDetails(userId: number): Observable<User> {
        return this.httpClient.get<User>(this.BASE_URL + "user/" + userId, { headers: this.headers })
            .pipe(catchError(this.errorHandeler.handleError));
    }


    deleteUser(userId: number): Observable<string> {
        return this.httpClient.delete<string>(this.BASE_URL + "user/" + userId, { headers: this.headers, responseType: 'text' as 'json' })
            .pipe(catchError(this.errorHandeler.handleError));
    }


}