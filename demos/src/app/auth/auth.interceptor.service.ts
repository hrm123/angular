import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { Subscription, Observable} from "rxjs";
import {Store} from '@ngrx/store';
import { AppState } from "../store/app-reducer";
import {take,map, exhaustMap} from 'rxjs/operators';
import {HttpEvent, HttpRequest} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    user: User;
    authSubs : Subscription;

    constructor(private authSvc: AuthService,
        private store : Store<AppState>) {
        // this.authSubs = authSvc.user.subscribe(usr => this.user = usr);//TODO unsubscribe
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
       Observable<HttpEvent<any>> {
         return this.store.select('auth').pipe(
             // take(1),
             map(authState => {
                 return authState.user;
             }),
             exhaustMap( user =>{
                 if(!user){
                     return next.handle(req);
                 }
                 const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                  });
                  return next.handle(modifiedReq);
             })


         );
         /*
        const reqWithAuthToken = req.clone({params: new HttpParams().set('auth', this.user.token)});
        return next.handle(reqWithAuthToken);
        */
    }

}