import {Actions, ofType, Effect}  from '@ngrx/effects'
import {switchMap, tap, catchError, map}  from 'rxjs/operators'
import * as authActions from './auth.actions';
import { AuthResponseData } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { User } from '../user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



const handleAuthSuccess = resData =>{
    const  expirationDate =
    new Date( new Date().getTime() +  +resData.expiresIn * 1000);
   const user  = new User(resData.email, resData.localId, resData.idToken, expirationDate);

    return new authActions.SignIn(user); // return the SignIn action taht wil be dispatched by the ngrx effects system
}


const handleAuthFailure = (err) =>{

    const dummyUser: User = new User("sds","sdsdd","sadsa",null);

    let errorMessage = "server error.";
    console.log("error~" + err);
    if(!err.error || !err.error.error){
        of(new authActions.SignInFail({errorMsg: errorMessage, user : dummyUser}));
    }
    switch(err.error.error.message){                    
        case "EMAIL_EXISTS":
            errorMessage = "This email is already eregistered.";
            break;
        case "EMAIL_NOT_FOUND":
            errorMessage = "This email is not eregistered.";
            break;
        case "INVALID_PASSWORD":
            errorMessage = "This email/pwd is invalid.";
            break;
        default:
            errorMessage = "server error";
            break;
    }

    // have to return non error observable since the effect needs to keep running and will stop is error is thrown
    
    return of(new authActions.SignInFail({errorMsg: errorMessage, user : dummyUser})); // TODO  return the SignIn action fail taht wil be dispatched by the ngrx effects system
 }
@Injectable()
export class AuthEffects {

    @Effect()
    authSignin = this.actions$.pipe(
        ofType(authActions.SIGNIN_START), // only SIGNIN_START action will trigger this effect
        switchMap( (authData: authActions.SignInStart) => {// returns http observable
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1z4vjGfZ2e0klKahf2SQAp0B3tRZpMXg';
            return this.http.post<AuthResponseData>(url,{
                email: authData.payload.email, 
                password: authData.payload.password,
                returnSecureToken : true
            }).pipe(map(resData => handleAuthSuccess(resData)),
            catchError( err => handleAuthFailure(err)) 
            );
        })); // ngrx effects will subsribe so no need to subsscribe here

    @Effect({dispatch : false}) // this effect does nto dispatch a new action at the end
    authSuccess = this.actions$.pipe(
        ofType(authActions.SIGNIN),
        tap(()=>{
            this.router.navigate(['/']);
        })
    );


    authSignup = this.actions$.pipe(
        ofType(authActions.SIGNUP_START),
        switchMap( (signupAction: authActions.SignUpStart) => {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1z4vjGfZ2e0klKahf2SQAp0B3tRZpMXg';
            const email = signupAction.payload.email;
            const password  = signupAction.payload.password;
            return this.http.post<AuthResponseData>(url,{
                email, password,returnSecureToken : true
            })
            .pipe(map(resData => handleAuthSuccess(resData)),
            catchError( err => handleAuthFailure(err)) 
            );

    }));


    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}

}