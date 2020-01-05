import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "../recipes/recipe.service";


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent{
    constructor(private dataService: DataStorageService,
        private recipeService: RecipeService) {}

    onSaveData(){
        this.dataService.storeRecipes();
    }

    onFetchData(){
        this.dataService.fetchRecipes();
    }
}