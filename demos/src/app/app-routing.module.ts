import { NgModule } from "@angular/core";
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuardService } from "./auth/auth.gaurd";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    {
      path: 'shopping-list',
      loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
    },
    {
      path: 'auth',
      loadChildren: './auth/auth.module#AuthModule'
    }
  ];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}