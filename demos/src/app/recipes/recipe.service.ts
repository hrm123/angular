import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient";
import { ShoppingListService } from "../shopping-list/shopping-list.service";


@Injectable()
export class RecipeService{

    /**
     *
     */
    constructor(private slService: ShoppingListService) {
        
        
    }

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test',
        'https://www.wholesomeyum.com/wp-content/uploads/2019/09/wholesomeyum-keto-chaffles-recipe-sweet-savory-5-ways-24.jpg',
        [new Ingredient("lady finger",13)]),
        new Recipe('A Test Recipe', 'This is simply a test',
        'https://www.wholesomeyum.com/wp-content/uploads/2019/09/wholesomeyum-keto-chaffles-recipe-sweet-savory-5-ways-24.jpg',
        [new Ingredient("apples",10), new Ingredient("fries",20)])
      ];

      recipeSelected = new EventEmitter<Recipe>();

      public getRecipes(){
          return this.recipes.slice(); // returns copy of an array not orgiinal array in this service
      }

      public addIngredientsToShoppingList(ingredients: Ingredient[]){
          this.slService.addIngredients(ingredients);
     }

     public getRecipe(id: number){
        return this.recipes.slice()[id];
   }

     
    
}