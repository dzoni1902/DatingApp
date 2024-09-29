import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse) {    // error from our API
                    
                    if(error.status === 401){
                        return throwError(() => new Error(error.statusText));
                    }

                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        return throwError(() => new Error(applicationError));
                    }

                    const serverError = error.error;
                    let modelStateErrors = '';
                    if(serverError && typeof serverError === 'object') {
                        for(const key in serverError) {
                            if(serverError[key]) {
                                modelStateErrors += serverError[key] + '\n';
                            }
                        }
                    }

                    if (modelStateErrors) {
                        return throwError(() => new Error(modelStateErrors));
                    }

                    if (serverError) {
                        return throwError(() => new Error(serverError));
                    }

                    return throwError(() => new Error('Server Error.'));
                }
                
                // Return a generic error if no specific error is found
                return throwError(() => new Error('An unexpected error occurred.'));
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}

