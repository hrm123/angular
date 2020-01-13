import { Component, OnInit , OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-reducer';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
 
  constructor(
    private router: Router,
    private curentRoute: ActivatedRoute,
    private store: Store<AppState>) { }

    private subs : Subscription;
    ngOnDestroy(){
      this.subs.unsubscribe();
    }

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes();
    this.subs = this.store.select('recipes')
    .pipe(map(recipesState => recipesState.recipes))
    .subscribe(
      (recipes: Recipe[]) => {
        debugger;
        this.recipes = recipes;
    })
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.curentRoute});
  }

}
