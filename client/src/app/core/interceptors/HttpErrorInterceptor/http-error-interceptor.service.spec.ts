import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptorService } from './http-error-interceptor.service';
import { SnackbarService } from 'src/app/shared/components/snackbar/service/snackbar.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HttpErrorInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [SnackbarService]
  }));

  it('should be created', () => {
    const service: HttpErrorInterceptorService = TestBed.get(HttpErrorInterceptorService);
    expect(service).toBeTruthy();
  });
});
