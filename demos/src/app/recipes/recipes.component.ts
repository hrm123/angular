import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy, OnChanges {
  private selectedRecipe1: Recipe;
  constructor(private recipeService: RecipeService) { }

  setSelectedRecipe(selRecipe: Recipe){

    console.log("setSelectedRecipe called");
    this.selectedRecipe1 = selRecipe;
  }
  ngOnChanges(changes: SimpleChanges){

  }
  ngOnInit() {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe1 = recipe;
      }
    );
  }
  ngOnDestroy(){

  }

}
