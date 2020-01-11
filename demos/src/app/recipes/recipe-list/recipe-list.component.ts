import { Component, OnInit , OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
 
  constructor(private recipeService: RecipeService,
    private router: Router,
    private curentRoute: ActivatedRoute) { }

    private subs : Subscription;
    ngOnDestroy(){
      this.subs.unsubscribe();
    }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subs = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        debugger;
        this.recipes = recipes;
    })
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.curentRoute});
  }

}
