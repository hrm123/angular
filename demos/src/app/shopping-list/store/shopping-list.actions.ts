import {Action} from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';


export interface SlAction extends Action{
    type: string;
    payload?: number | Ingredient | Ingredient [] | UpdateIngredientShape

}

export const ADD_INGREDIENT = "addIngredient";
export const ADD_INGREDIENTS = "addIngredients";
export const UPDATE_INGREDIENT = "editIngredient";
export const DELETE_INGREDIENT = "deleteIngredient";
export const START_INGREDIENT_EDIT  = "startEdit";
export const STOP_INGREDIENT_EDIT = "stopEdit";

export class StartIngredientEditAction  implements SlAction{
    readonly type: string = START_INGREDIENT_EDIT;
    constructor(public payload : number) {}

};

export class StopIngredientEditAction  implements SlAction{
    readonly type: string = STOP_INGREDIENT_EDIT;

};

export class AddIngredientAction  implements Action{
    readonly type: string = ADD_INGREDIENT;
    constructor(public payload : Ingredient) {}

};

export class AddIngredientsAction  implements Action{
    readonly type: string = ADD_INGREDIENTS;
    constructor(public payload : Ingredient[]) {}

};

export type UpdateIngredientShape = {ingredient: Ingredient};

export class UpdateIngredientAction  implements Action{
    readonly type: string = UPDATE_INGREDIENT;
    constructor(public payload : UpdateIngredientShape) {}
};

export class DeleteIngredientAction  implements Action{
    readonly type: string = DELETE_INGREDIENT;
};

export type ShoppingListActionItems =   AddIngredientAction | AddIngredientsAction
| UpdateIngredientAction | DeleteIngredientAction | StartIngredientEditAction | StopIngredientEditAction;