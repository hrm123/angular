import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, tap } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate{


    constructor(private authSvc: AuthService,
        private router: Router){}

    canActivate(route: import("@angular/router").ActivatedRouteSnapshot,
     state: import("@angular/router").RouterStateSnapshot):
      boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        return this.authSvc.user.pipe(map(user => { // Todo : unsubscribe
             const isAuth =  user.email !== "sds";
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