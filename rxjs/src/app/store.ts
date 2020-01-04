import * as actions from './actions';


export interface IAppState{
    counter: number;
    messageData? : {
        newMessages : number;

    }
}


export const INITIAL_STATE: IAppState = {
    counter: 0,
    messageData : {
        newMessages : 5

    }
};

export function rootReducer(state: IAppState, action) : IAppState{

    switch(action.type){
        case actions.INCREMENT:
            return { counter: state.counter + 1}; // original state not modified
    }
    return state;

}