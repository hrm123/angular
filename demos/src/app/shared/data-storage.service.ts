import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app-reducer';
import * as recipesActions  from '../recipes/store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ngdemos-f6fae.firebaseio.com/recipes.json?key=AIzaSyB1z4vjGfZ2e0klKahf2SQAp0B3tRZpMXg',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    debugger;
    return this.http
      .get<Recipe[]>(
        'https://ngdemos-f6fae.firebaseio.com/recipes.json?key=AIzaSyB1z4vjGfZ2e0klKahf2SQAp0B3tRZpMXg'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          // this.recipeService.setRecipes(recipes);
          debugger;
          this.store.dispatch(new recipesActions.SetRecipes(recipes));
        })
      ).subscribe();
  }
}
