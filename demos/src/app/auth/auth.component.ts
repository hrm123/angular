import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Subscriber, Observable } from "rxjs";
import { ERROR_COMPONENT_TYPE } from "@angular/compiler";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    isLoggedMode = true;
    isLoading = false;
    error : string = null;
    constructor(private authService: AuthService,
        private router: Router) {
        
        
    }
    onToggleMode(){
        this.isLoggedMode = !this.isLoggedMode;
    }

    onSubmit(form: NgForm){
        // console.log(form.value);

        if(!form.valid){
            return;
        }
debugger;
        const email = form.value.email;
        const password = form.value.password;

        let authObs : Observable<AuthResponseData>;

        this.isLoading = true;
        if(this.isLoggedMode){
            authObs = this.authService.login(email, password);
        } else{
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(
            resData => {
                // console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errMessage => {
                this.isLoading = false;
                this.error = errMessage
            }
        );

        form.reset();
    }

}