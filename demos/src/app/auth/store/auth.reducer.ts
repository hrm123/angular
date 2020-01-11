import { User } from "../user.model";
import * as authActions from "./auth.actions";
import { Statement } from "@angular/compiler";



export interface State {
    user  : User
}


const initialState : State = {
    user : null
}

export function authReducer(state = initialState, action : authActions.AuthAction) {
    switch(action.type){
            case authActions.SIGNIN:
                const user = action.payload as User;
                return {
                    ...state,
                    user
                };
            break;
            case authActions.SIGNOUT:
                return {
                    ...state,
                    user: null
                };
                break;
            default:
                return state;
    }
}