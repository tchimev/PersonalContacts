import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, throwError } from 'rxjs';
import { addGlobalError } from 'src/store/error/error.action';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly _store: Store) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this._store.dispatch(addGlobalError({ error: error }));
        return throwError(() => error);
      })
    );
  }
}
