import { Recipe } from "../recipe.model";
import * as recipesActions  from "./recipe.actions";
import { Ingredient } from "src/app/shared/ingredient.model";



export interface State{
    recipes: Recipe[]

}
/*
const initialState : State = {
    recipes: [
        new Recipe(
          'Tasty Schnitzel',
          'A super-tasty Schnitzel - just awesome!',
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
          [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
        ),
        new Recipe(
          'Big Fat Burger',
          'What else you need to say?',
          'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
          [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
        )
      ]
}
*/
const initialState : State = {
    recipes: null
};

export function RecipeReducer(state = initialState, 
    action: recipesActions.RecipesActions) {
    switch(action.type){
        case recipesActions.SET_RECIPES:
            debugger;
            return {
                ...state,
                recipes: [...action.payload]
            }
            break;
        default:
            return state;
    }
}