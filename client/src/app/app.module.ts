import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./modules/home/home.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModalComponent } from "./shared/components/modal/modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PlateInfoGroupComponent } from "./shared/components/plate-info-group/plate-info-group.component";
import { HttpErrorInterceptorService } from "./core/interceptors/HttpErrorInterceptor/http-error-interceptor.service";
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';

@NgModule({
  declarations: [AppComponent, ModalComponent, SnackbarComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
