import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './security/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from './security/login/service/login-service.service';
import { HttpClientModule } from '@angular/common/http';
import { LoggedInGuard } from './security/loggedin.guard';
import { HomeComponent } from './core/components/home/home.component';
import { AuthInterceptor } from './security/auth.interceptor';
import { RegistrationComponent } from './security/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './layout/header/header.component';
import { WeathermapService } from './core/services/weathermap.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule

  ],
  providers: [
    LoginServiceService,
    LoggedInGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    WeathermapService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
