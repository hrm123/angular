import {Action} from '@ngrx/store';
import { Ingredient } from "../../shared/ingredient";
import * as ShoppingListActions from './shopping-list.actions';



export interface AppState {
    shoppingList : SLState
}

export interface SLState {
    ingredients :Ingredient[] ,
      editedIngredient : Ingredient,
      editedIngredientIndex  : number
}

const initialState : SLState  = {
     ingredients : [
    new Ingredient("Apples",5),
    new Ingredient("Tomatoes",10)
  ],
  editedIngredient : null,
  editedIngredientIndex  : -1
};

export function shoppingListReducer(
    state = initialState,
    action: ShoppingListActions.SlAction
    ){
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {...state,
                ingredients: [...state.ingredients, action.payload ]}
            break;
        case ShoppingListActions.ADD_INGREDIENTS:
            return {...state,
                ingredients: [...state.ingredients, ...action.payload as Ingredient[] ]}
            break;
        case ShoppingListActions.UPDATE_INGREDIENT:
            const editedIndex = state.editedIngredientIndex;
            const ingr = state.ingredients[editedIndex];
            const updatedIngredient = {
                ...Ingredient,
                ...(action.payload as ShoppingListActions.UpdateIngredientShape).ingredient
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[editedIndex] =  updatedIngredient;
            return{
                ...state,
                ingredients: updatedIngredients,
                editedIngredient : null,
                editedIngredientIndex : -1
            };
            break;
            case ShoppingListActions.DELETE_INGREDIENT:
                return{
                    ...state,
                    ingredients: state.ingredients.filter( (igr,index) => index !== state.editedIngredientIndex),
                    editedIngredient : null,
                    editedIngredientIndex : -1
                }
                break;
            case ShoppingListActions.START_INGREDIENT_EDIT:
                debugger;
                return {
                    ...state,
                    editedIngredientIndex : action.payload,
                    editedIngredient: { ...state.ingredients[+action.payload]} // here spread operator makes a copy
                }
                break;
            case  ShoppingListActions.STOP_INGREDIENT_EDIT:
                return {
                    ...state,
                    editedIngredientIndex : -1,
                    editedIngredient: null
                }
                break;
        default:
            return state; // unchanged - this will be used by system to know the shape of state
            break;
    }
}