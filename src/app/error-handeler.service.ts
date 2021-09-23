import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandelerService {

  constructor() { }

  public handleError(err: HttpErrorResponse) {
    console.log(err)
    let errMsg: string = '';
    if (err.status == 0) {
      errMsg = "A connection to back end can not be established.";
    }
    if (err.status >= 500) {
      errMsg = "There is an internal server error!! Please try again later.";
    } else {
      if (err.error instanceof Error) {
        console.log("Inside if of error handeler service")
        if (err.status == 401) {
          errMsg = "You are not authorised to access the page. Please login!!";
        } else if (err.status == 403) {
          errMsg = "Bad credentials.";
        }
        else {
          errMsg = err.error.message;
          console.log(errMsg)
        }
      }
      else if (typeof err.error === 'string') {
        errMsg = JSON.parse(err.error).message
      }
      else {
        errMsg = err.error.message;
      }
    }
    return throwError(errMsg);
  }
}
