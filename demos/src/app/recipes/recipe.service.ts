import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient";



export class RecipeService{
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
    
}