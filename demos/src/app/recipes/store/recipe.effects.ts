import {Actions, Effect, ofType} from '@ngrx/effects';
import * as recipeActions from './recipe.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects{

    constructor(private action$: Actions,
        private http: HttpClient) {}   

    @Effect()
    fetchRecipes = this.action$.pipe(
        ofType(recipeActions.FETCH_RECIPES),
        switchMap(() =>{
            return this.http
            .get<Recipe[]>(
                'https://ngdemos-f6fae.firebaseio.com/recipes.json?key=AIzaSyB1z4vjGfZ2e0klKahf2SQAp0B3tRZpMXg'
            );
        }),
        map(recipes => {
            return recipes.map(recipe => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            });
          }),
          map(recipes =>{
              return new recipeActions.SetRecipes(recipes);
          })

    );
}