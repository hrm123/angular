import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor( private http: HttpClient,
        private recipeService: RecipeService) {}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ngdemos-f6fae.firebaseio.com/recipes.json', recipes)
        .subscribe(
            (res) => console.log(res)
        );
    }

    
    fetchRecipes(){
        this.http.get<Recipe[]>('https://ngdemos-f6fae.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recp => {
                return {
                    ...recp, ingredients: recp.ingredients ?  recp.ingredients  : []
                };
            });
        }))
        .subscribe(
            (res) => {
                console.log(res);
                this.recipeService.replaceRecipes(res);
            },
            (err)=>{
                console.log(err);
            }
        );
    }
    
}