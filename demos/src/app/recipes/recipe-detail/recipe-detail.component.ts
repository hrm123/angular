import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient  } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app-reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
    private currentRoute: ActivatedRoute,
    private router : Router,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    debugger;
    this.currentRoute.params.subscribe(
      (params: Params) =>{
        this.id = +params['id']; //+ just casts string to number
        // this.recipe = this.recipeService.getRecipe(this.id);
        debugger;
        this.store.select('recipes').pipe(map(recipesState => {
          debugger;
          return recipesState.recipes.find((r,i) => i === this.id )
        })).subscribe(
          recipe =>{
            debugger;
             this.recipe = recipe;
          });
      }
      );
  }

  onAddToShoppingList(ingredients: Ingredient[]){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo : this.currentRoute});
    // this also works - this.router.navigate(['../', this.id, 'edit'], {relativeTo : this.currentRoute});
  }

  onDeleteRecipe(id : number){
    this.recipeService.deleteRecipe(id);
    this.router.navigate(['/recipes']);
  }

}
