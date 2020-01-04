import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy, OnChanges {
  private selectedRecipe1: Recipe;
  constructor() { }

  setSelectedRecipe(selRecipe: Recipe){
    debugger;
    console.log("setSelectedRecipe called");
    this.selectedRecipe1 = selRecipe;
  }
  ngOnChanges(changes: SimpleChanges){
    debugger;
  }
  ngOnInit() {
    debugger;
  }
  ngOnDestroy(){
    debugger;
  }

}
