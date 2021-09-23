import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavHeaderComponent } from './home/nav-header/nav-header.component';
import { NavUserHeaderComponent } from './users/nav-user-header/nav-user-header.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenStorage } from './token-storage/token-storage';
import { LoginComponent } from './home/login/login.component';
import { LoginServcie } from './home/login/login-service';
import { HomeRoutingModule } from './home/home-routing.module';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { RequestInterceptor } from './request-interceptor';
import { ErrorHandelerService } from './error-handeler.service';
import { AppRoutingGuard } from './app.routing-guard';
import { AuthorisationErrorComponent } from './errors/authorisation-error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    NavUserHeaderComponent,
    LoginComponent,
    UsersComponent,
    RegisterComponent,
    HomeComponent,
    AuthorisationErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeModule,
    UsersModule
  ],
  providers: [
    LoginServcie,
    TokenStorage,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    ErrorHandelerService,
    AppRoutingGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
