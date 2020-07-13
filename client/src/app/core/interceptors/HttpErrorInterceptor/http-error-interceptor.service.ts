import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, EMPTY, timer } from "rxjs";
import { catchError } from "rxjs/operators";
import { SnackbarService } from "src/app/shared/components/snackbar/service/snackbar.service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private snackbarService: SnackbarService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          this.snackbarService.showSnackbar("Something went wrong...");
          console.error("An error occurred:", error.error.message);
          timer(5000).subscribe(() => this.snackbarService.hideSnackbar());
        } else {
          this.snackbarService.showSnackbar("Something went wrong...");
          if (error.status === 504) {
            this.router.navigate(["bad-request"])
          }
          console.error(
            `Backend returned code ${error.status}, body was: ${JSON.stringify(
              error.error
            )}`
          );
          timer(5000).subscribe(() => this.snackbarService.hideSnackbar());
        }
        return EMPTY;
      })
    );
  }
}
