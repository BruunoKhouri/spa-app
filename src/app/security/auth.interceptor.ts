import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { LoginServiceService } from './login/login-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Get Token data from local storage
        let tokenInfo = JSON.parse(localStorage.getItem('user'));
        console.log(tokenInfo);
        if (tokenInfo) {
            console.log('teste', tokenInfo);
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenInfo.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
        } 
        console.log(request);
        return next.handle(request);

    }

}