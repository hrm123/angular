import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app-reducer';
import { map, filter, take } from 'rxjs/operators';
import    'rxjs/add/observable/of';

@Injectable({ providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private dataService : DataStorageService, private store: Store<fromApp.AppState>) {
        

        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Recipe[]>{
        this.dataService.fetchRecipes(); // will dispatch SET_RECIPE command
        return this.waitForRecipesDataToLoad(); // wait till recipes are loaded into store
        // return Observable.of('NONE');
    }

    waitForRecipesDataToLoad(): Observable<Recipe[]> {
        return this.store.select('recipes')
        .pipe(
          map(store => store.recipes),
          filter(recipes  => !!recipes ),
          take(1)
        );
      }
    

}