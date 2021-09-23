import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorage } from './token-storage/token-storage';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private token: TokenStorage, private router: Router) {
        console.log("Inside the Interceptor");
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        console.log("Inside the Interceptor");
        if (this.token.getToken() != null) {
            console.log("In the interceptor : " + req.headers)
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken()) });
            console.log(authReq);
        }
        return next.handle(authReq);
    }

}