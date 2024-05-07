import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(){}

    intercept(request: HttpRequest<unknown>, next: HttpHandler) : Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';

                    if(error.error instanceof ErrorEvent){
                        console.log('This is client side error');
                        errorMessage = `Error ${error.error.message}`;
                    } else {
                        console.log('This is server error');
                        errorMessage = `Error code ${error.status}, Message ${error.message}`;
                    }

                    console.log(errorMessage);
                    return throwError(() => new Error(errorMessage));

                })
            )
    }
}