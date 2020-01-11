import { Component, EventEmitter, Output, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { Subscribable, Subscription } from "rxjs";
import { User } from "../auth/user.model";
import { map, tap, take } from "rxjs/operators";
import { AppState } from "../store/app-reducer";
import {Store} from '@ngrx/store';


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    constructor(private dataService: DataStorageService,
        private recipeService: RecipeService,
        private authSvc : AuthService,
        private store : Store<AppState>) {}

        userSub: Subscription;
        user: User;
        isAuthenticated = false;

        ngOnInit(){
            this.userSub = this.store.select('auth').subscribe( authState => {
                this.user = authState.user;
                this.isAuthenticated = this.user && this.user.email !== "sds";
            });             
        }

        onLogout(){
            this.authSvc.logout();
        }

        ngOnDestroy(){
            this.userSub.unsubscribe();
        }

        onSaveData(){
            this.dataService.storeRecipes();
        }

        onFetchData(){
            this.dataService.fetchRecipes().subscribe();
        }
}