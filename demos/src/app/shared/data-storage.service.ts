import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import {map, tap} from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { Subscriber, Subscription } from "rxjs";
import { User } from "../auth/user.model";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor( private http: HttpClient,
        private recipeService: RecipeService,
        private authSvc : AuthService) {
            this.authSubs = authSvc.user.subscribe(usr => this.user = usr);
        }


    user: User;
    authSubs : Subscription;


    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        // this.http.put('https://ngdemos-f6fae.firebaseio.com?auth=' +  this.user.token, recipes)
        this.http.put('https://ngdemos-f6fae.firebaseio.com', recipes)
        .subscribe(
            (res) => console.log(res)
        );
    }

    
    fetchRecipes(){
        // return this.http.get<Recipe[]>('https://ngdemos-f6fae.firebaseio.com/recipes.json?auth='+ this.user.token)
        return this.http.get<Recipe[]>('https://ngdemos-f6fae.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recp => {
                return {
                    ...recp, ingredients: recp.ingredients ?  recp.ingredients  : []
                };
            });
        }),
         tap(recipes => {
            this.recipeService.replaceRecipes(recipes);
         })
        )
        /*
        .subscribe(
            (res) => {
                console.log(res);
                this.recipeService.replaceRecipes(res);
            },
            (err)=>{
                console.log(err);
            }
        );
        */
    }
    
}