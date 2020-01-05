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

    private tokenExpirationTimer: any;
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


    autoLogout(expirationDuration: number){
        console.log('expirationDuration-' + expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);

    }

    autoLogin(){
        const userData : { email: string, id: string, _token: string, _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData'));
        if(!userData || userData.email === "sds"){
            return;
        }

        const loadedUser = new User(userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
            );
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        } else{
            return; // the user has to auth again
        }

    }

    logout(){
        this.user.next(this.dummyUser);
        localStorage.setItem('userData', JSON.stringify(JSON.stringify( this.dummyUser)));
        if(this.tokenExpirationTimer ){
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
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
       this.autoLogout(expiresIn * 1000);
       localStorage.setItem('userData', JSON.stringify( user));
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