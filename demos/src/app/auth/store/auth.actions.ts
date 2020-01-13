import {Action} from '@ngrx/store';
import { User } from '../user.model';
export const SIGNIN = "SIGNIN";
export const SIGNIN_START = "SIGNIN_START";
export const SIGNOUT = "SIGNOUT"
export const SIGNIN_FAIL = "SIGNIN_FAIL";
export const SIGNUP_START = "SIGNUP_START";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const AUTO_SIGNIN = "AUTO_SIGNIN";
/*
export interface User {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
}
*/


export interface AuthAction extends Action {
    type: string;
    payload?: User |  {email: string, password: string} | {errorMsg: string, user : User}

}

export class SignIn implements AuthAction {
    readonly type = SIGNIN;

    constructor(public payload:  User) {}
}



export class AutoSignIn implements AuthAction {
    readonly type = AUTO_SIGNIN;

}


export class ClearError implements AuthAction {
    readonly type = CLEAR_ERROR;

}


export class SignInStart implements AuthAction {
    readonly type = SIGNIN_START;

    constructor(public payload: {email: string, password: string}) {}
}

export class SignUpStart implements AuthAction {
    readonly type = SIGNUP_START;

    constructor(public payload: {email: string, password: string}) {}
}


export class SignInFail implements AuthAction {
    readonly type = SIGNIN_FAIL;

    constructor(public payload:  {errorMsg: string, user : User}) {}
}


export class SignOut implements AuthAction {
    readonly type = SIGNOUT;

    constructor(public payload: User) {}
}

export type authActions = SignIn | SignOut | SignInFail | SignInStart | SignUpStart | ClearError | AutoSignIn;