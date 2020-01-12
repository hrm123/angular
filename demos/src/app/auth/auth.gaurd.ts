import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, tap, take } from "rxjs/operators";
import { AppState } from "../store/app-reducer";
import {Store} from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate{


    constructor(private authSvc: AuthService,
        private router: Router,
        private store : Store<AppState>){}

    canActivate(route: import("@angular/router").ActivatedRouteSnapshot,
     state: import("@angular/router").RouterStateSnapshot):
      boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
             map(authState => {
                 return authState.user;
             }),
             map(user => { 
             const isAuth =  user && user.email !== "sds";
             if(isAuth){
                 return true;
             }
             return this.router.createUrlTree(['/auth']);
        }), 

        /* tap(isAuth =>{
            if(!isAuth){
                this.router.navigate(['/auth']);
            }
        })*/
        );
    }

}