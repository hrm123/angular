import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Subscriber, Observable, Subscription } from "rxjs";
import { ERROR_COMPONENT_TYPE } from "@angular/compiler";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app-reducer";
import * as AuthActions from "./store/auth.actions";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
    isLoggedMode = true;
    isLoading = false;
    error : string = null;
    private closeSub: Subscription;
    
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
    
    constructor(private authService: AuthService,
        private router: Router, private store : Store<fromApp.AppState>,
        private componentFactoryResolver: ComponentFactoryResolver) {}
        
    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
       
    ngOnInit(){
        this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            debugger;
            if(this.error){
                debugger;
                this.showErrorAlert(this.error);
            }
        });
        
    }

    showErrorAlert(message: string) {
        // const alertCmp = new AlertComponent();
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
          AlertComponent
        );
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
    
        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
          this.closeSub.unsubscribe();
          hostViewContainerRef.clear();
        });
      }
    
    onToggleMode(){
        this.isLoggedMode = !this.isLoggedMode;
    }

    onSubmit(form: NgForm){
        // console.log(form.value);

        if(!form.valid){
            return;
        }

        const email = form.value.email;
        const password = form.value.password; 

        this.isLoading = true;
        if(this.isLoggedMode){
            // authObs = this.authService.login(email, password);
            this.store.dispatch(new AuthActions.SignInStart({email, password}));
        } else{
            // authObs = this.authService.signUp(email, password);
            this.store.dispatch(new AuthActions.SignUpStart({email, password}));
        }

        this.store.select('auth').subscribe(authState => {

        });

        /*
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
        */

        form.reset();
    }

}