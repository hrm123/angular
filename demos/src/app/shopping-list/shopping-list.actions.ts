import {Action} from '@ngrx/store';
import { Ingredient } from '../shared/ingredient';


export const ADD_INGREDIENT = "addIngredient";
export const ADD_INGREDIENTS = "addIngredients";
export const UPDATE_INGREDIENT = "editIngredient";
export const DELETE_INGREDIENT = "deleteIngredient";

export class AddIngredientAction  implements Action{
    readonly type: string = ADD_INGREDIENT;
    constructor(public payload : Ingredient) {}

};

export class AddIngredientsAction  implements Action{
    readonly type: string = ADD_INGREDIENTS;
    constructor(public payload : Ingredient[]) {}

};

export type UpdateIngredientShape = {index: number, ingredient: Ingredient};

export class UpdateIngredientAction  implements Action{
    readonly type: string = UPDATE_INGREDIENT;
    constructor(public payload : UpdateIngredientShape) {}
};

export class DeleteIngredientAction  implements Action{
    readonly type: string = DELETE_INGREDIENT;
    constructor(public payload : number) {}
};

export type ShoppingListActionItems =   AddIngredientAction | AddIngredientsAction
| UpdateIngredientAction | DeleteIngredientAction ;