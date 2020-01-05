import { Ingredient } from "../shared/ingredient";
import { Output, EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ShoppingListService{
    private ingredients :Ingredient[] = [
        new Ingredient("Apples",5),
        new Ingredient("Tomatoes",10)
      ];
      startedEditing = new Subject<number>();
      @Output() ingredientschanged = new EventEmitter<Ingredient[]>();

      public getIngredients(){
          return this.ingredients.slice();
      }

      public addIngredient(ing: Ingredient){
        
        this.ingredients.push(ing);
        this.ingredientschanged.emit(this.ingredients.slice());
    }


    getIngredient(index: number){
        return this.ingredients[index];
    }

    public addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients); //since push will otherwise push array as single obejct in existing array
        this.ingredientschanged.emit(this.ingredients.slice());
    }
    
    public deleteIngredients(index: number){
        this.ingredients.splice(index,1);
        this.ingredientschanged.emit(this.ingredients.slice());
    }

    public updateIngredients(index: number, newIngredients: Ingredient){
        this.ingredients[index] = newIngredients;
        this.ingredientschanged.emit(this.ingredients.slice());
    }

    
    
}