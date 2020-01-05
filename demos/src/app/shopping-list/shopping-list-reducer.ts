import {Action} from '@ngrx/store';
import { Ingredient } from "../shared/ingredient";
import * as ShoppingListActions from './shopping-list.actions';



const initialState = {
     ingredients : [
    new Ingredient("Apples",5),
    new Ingredient("Tomatoes",10)
  ]
};

export function shoppingListReducer(
    state = initialState,
    action: ShoppingListActions.ShoppingListActionItems
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
                const editedIndex = (action.payload as ShoppingListActions.UpdateIngredientShape).index;
                const ingr = state.ingredients[editedIndex];
                const updatedIngredient = {
                    ...Ingredient,
                    ...(action.payload as ShoppingListActions.UpdateIngredientShape).ingredient
                };
                const updatedIngredients = [...state.ingredients];
                updatedIngredients[editedIndex] =  updatedIngredient;
                return{
                    ...state,
                    ingredients: updatedIngredients
                };
                break;
            case ShoppingListActions.DELETE_INGREDIENT:
                return{
                    ...state,
                    ingredients: state.ingredients.filter( (igr,index) => index !== action.payload)
                }
                break;
        default:
            return state; // unchanged - this will be used by system to know the shape of state
            break;
    }
}