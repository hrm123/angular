import { User } from "../user.model";
import * as authActions from "./auth.actions";
import { Statement } from "@angular/compiler";



export interface State {
    user  : User;
    authError: string;
    loading: boolean;
}


const initialState : State = {
    user : null,
    authError : null,
    loading : false
}

export function authReducer(state = initialState, action : authActions.AuthAction) {
    switch(action.type){
            case authActions.SIGNIN:
                const user = action.payload as User;
                return {
                    ...state,
                    user,
                    authError: null,
                    loading: false
                };
            break;
            case authActions.SIGNIN_START:
                return {
                    ...state,
                    authError: null,
                    loading: true
                };
            break;
            case authActions.SIGNIN_FAIL:
                debugger;
                const user1 = action.payload["user"] as User;
                return {
                    ...state,
                    user: user1,
                    authError: action.payload["errorMsg"],
                    loading: false
                };
            break;
            case authActions.SIGNUP_START:
                break;
            case authActions.SIGNOUT:
                return {
                    ...state,
                    user: null,
                    authError: null
                };
                break;
            default:
                return state;
    }
}