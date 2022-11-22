import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanLoad, Route, CanActivate, RouterStateSnapshot } from "@angular/router";
import { LoginServiceService } from './login/service/login-service.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginServiceService) { }

    public checkAuthentication(path: string): boolean {
        const loggedIn = this.loginService.isLoggedIn();
        if (!loggedIn) {
            this.loginService.handleLogin(`/${path}`);
        }
        return loggedIn;

    }

    canLoad(route: Route): boolean {
        console.log('canLoad');
        return this.checkAuthentication(route.path);
    }

    canActivate(
        activatedRoute: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot
    ): boolean {

        console.log('canActivate');
        return this.checkAuthentication(activatedRoute.routeConfig.path);
    }
}