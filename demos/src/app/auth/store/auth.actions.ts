import {Action} from '@ngrx/store';
import { User } from '../user.model';
export const SIGNIN = "SIGNIN";
export const SIGNIN_START = "SIGNIN_START";
export const SIGNOUT = "SIGNOUT"

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
    payload?: User |  {email: string, password: string}

}

export class SignIn implements AuthAction {
    readonly type = SIGNIN;

    constructor(public payload: User) {}
}


export class SignInStart implements AuthAction {
    readonly type = SIGNIN_START;

    constructor(public payload: {email: string, password: string}) {}
}


export class SignOut implements AuthAction {
    readonly type = SIGNOUT;

    constructor(public payload: User) {}
}

export type authActions = SignIn | SignOut;