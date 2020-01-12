import {Actions, ofType, Effect}  from '@ngrx/effects'
import {switchMap, tap, catchError, map}  from 'rxjs/operators'
import * as authActions from './auth.actions';
import { AuthResponseData } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { User } from '../user.model';
import { Injectable } from '@angular/core';

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
            }).pipe(map(resData =>{
                const  expirationDate =
                new Date( new Date().getTime() +  +resData.expiresIn * 1000);
               const user  = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        
                return of(new authActions.SignIn(user)); // return the SignIn action taht wil be dispatched by the ngrx effects system
            }),
            catchError(
                error => {
                    // have to return non error observable since the effect needs to keep running and will stop is error is thrown
                    return of(); // TODO  return the SignIn action fail taht wil be dispatched by the ngrx effects system
                 }

            ) )
        }),

    ); // ngrx effects will subsribe so no need to subsscribe here

    constructor(private actions$: Actions, private http: HttpClient) {}

}