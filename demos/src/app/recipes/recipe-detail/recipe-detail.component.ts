import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    private router : Router
    ) { }

  ngOnInit() {
    this.currentRoute.params.subscribe(
      (params: Params) =>{
        this.id = +params['id']; //+ just casts string to number
        this.recipe = this.recipeService.getRecipe(this.id);
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
