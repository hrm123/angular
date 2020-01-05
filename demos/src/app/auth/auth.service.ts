import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwIfEmpty, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

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

    constructor(private http: HttpClient) {
        
    }

    signUp(email : string, password: string){
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1z4vjGfZ2e0klKahf2SQAp0B3tRZpMXg';
        return this.http.post<AuthResponseData>(url,{
            email, password,returnSecureToken : true
        }).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = "server error.";
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
            catchError(this.handleError)
        );;
    }
}