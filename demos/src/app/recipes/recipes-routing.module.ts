import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuardService } from "../auth/auth.gaurd";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { NgModule } from "@angular/core";
import { RecipesResovlerService } from "./recipes-resolver.service";

const recipeRoutes : Routes  = [
        {path: '',
        component: RecipesComponent, 
        canActivate: [AuthGuardService],
        children: [
            {path: '', component: RecipeStartComponent, resolve: [RecipesResovlerService]},
            {path: "new", component: RecipeEditComponent},
            {
                path: ":id", 
                component: RecipeDetailComponent, 
                //resolve: [RecipesResovlerService]
            },
            {
                path: ":id/edit", 
                component: RecipeEditComponent, 
                //resolve: [RecipesResovlerService]
            }
            ]
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(recipeRoutes)],
        exports: [RouterModule]
    })
    export class RecipesRoutingModule {} 

