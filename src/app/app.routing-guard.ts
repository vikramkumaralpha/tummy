import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class AppRoutingGuard implements CanActivate {

    constructor(private route: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        console.error("i m in Route guard");
        let token = sessionStorage.getItem("AuthToken");
        if (token) {
            return true;
        } else {
            this.route.navigate(["error"]);
            return false;

        }
    }

}