import { NgModule } from "@angular/core";
import {Routes, RouterModule, PreloadingStrategy, PreloadAllModules} from '@angular/router';
//import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
//import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
//import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
//import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
//import { RecipesResovlerService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
//import { AuthGuardService } from "./auth/auth.gaurd";

const appRoutes : Routes = [
    {path: '', redirectTo : '/recipes',
     pathMatch: "full" ,
     data: {
        animation: 'routeAnimations'
     }
    },
    {path: 'recipes',
    data: {
       animation: 'recipes'
    },
     loadChildren:'./recipes/recipes.module#RecipesModule'},
    {path: 'shopping-list',
    data: {
       animation: 'shopping-list'
    }, component: ShoppingListComponent},
    {path: 'auth', component: AuthComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes,
    {preloadingStrategy : PreloadAllModules})],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}