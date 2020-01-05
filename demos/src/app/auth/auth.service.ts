import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwIfEmpty, catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered? : boolean
}

@Injectable({providedIn: 'root'})
export class AuthService{

    dummyUser: User = new User("sds","sdsdd","sadsa",null);

    user = new BehaviorSubject<User>(this.dummyUser);

    constructor(private http: HttpClient,
        private router: Router) {
        
    }

    signUp(email : string, password: string){
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1z4vjGfZ2e0klKahf2SQAp0B3tRZpMXg';
        return this.http.post<AuthResponseData>(url,{
            email, password,returnSecureToken : true
        }).pipe(
            catchError(this.handleError), 
            tap(res => {
                console.log("auth response ~" + res)
                this.handleAuth(res.email, res.localId,
                    res.idToken, +res.expiresIn
                    );
            })
        );
    }

    logout(){
        this.user.next(this.dummyUser);
        this.router.navigate(['/auth']);
    }

    private handleAuth(
        email: string, 
        userId: string,
        token: string, 
        expiresIn: number
        ){
        const  expirationDate =
        new Date( new Date().getTime() +  expiresIn * 1000);
       const user  = new User(email,userId, token, expirationDate);
       
       this.user.next(user);
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = "server error.";
        console.log("error~" + err);
        if(!err.error || !err.error.error){
            return throwError(errorMessage);
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
        return throwError(errorMessage);
    }

    login(email : string, password: string){
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1z4vjGfZ2e0klKahf2SQAp0B3tRZpMXg';
        return this.http.post<AuthResponseData>(url,{
            email, password,returnSecureToken : true
        }).pipe(
            catchError(this.handleError), 
            tap(res => {
                this.handleAuth(res.email, res.localId,
                    res.idToken, +res.expiresIn
                    );
            })
        );
    }
}