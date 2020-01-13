import { User } from "../user.model";
import * as authActions from "./auth.actions";
import { Statement } from "@angular/compiler";



export interface State {
    user  : User;
    authError: string;
    loading: boolean;
}


const initialState : State = {
    user : new User("sds","sdsdd","sadsa",null),
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
            case authActions.CLEAR_ERROR:
                return {
                    ...state,
                    authError : null
                };
                break;
            case authActions.SIGNIN_FAIL:
                const user1 = action.payload["user"] as User;
                return {
                    ...state,
                    user: user1,
                    authError: action.payload["errorMsg"],
                    loading: false
                };
            break;
            case authActions.SIGNUP_START:
                return {
                    ...state,
                    authError: null,
                    loading: true
                };
                break;
            case authActions.SIGNOUT:
                const dummyUser: User = new User("sds","sdsdd","sadsa",null);
                return {
                    ...state,
                    user: dummyUser,
                    authError: null
                };
                break;
            default:
                return state;
    }
}