import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { Subscription } from "rxjs";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    user: User;
    authSubs : Subscription;

    constructor(private authSvc: AuthService) {
        this.authSubs = authSvc.user.subscribe(usr => this.user = usr);//TODO unsubscribe
    }

    intercept(req: import("@angular/common/http").HttpRequest<any>,
     next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        const reqWithAuthToken = req.clone({params: new HttpParams().set('auth', this.user.token)});
        return next.handle(reqWithAuthToken);
    }

}