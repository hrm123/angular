import { Ingredient } from "../shared/ingredient";
import { Output, EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class ShoppingListService{
    private ingredients :Ingredient[] = [
        new Ingredient("Apples",5),
        new Ingredient("Tomatoes",10)
      ];

      @Output() ingredientschanged = new EventEmitter<Ingredient[]>();

      public getIngredients(){
          return this.ingredients.slice();
      }

      public addIngredient(ing: Ingredient){
        
        this.ingredients.push(ing);
        this.ingredientschanged.emit(this.ingredients.slice());
    }

    public addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients); //since push will otherwise push array as single obejct in existing array
        this.ingredientschanged.emit(this.ingredients.slice());
    }
    
}