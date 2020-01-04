import { Ingredient } from "../shared/ingredient";
import { Output, EventEmitter } from "@angular/core";


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
    
}