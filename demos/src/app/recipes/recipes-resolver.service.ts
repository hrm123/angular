import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({ providedIn: 'root'})
export class RecipesResovlerService implements Resolve<Recipe[]>{

    constructor(private dataService : DataStorageService) {
        
        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.dataService.fetchRecipes();
    }

}