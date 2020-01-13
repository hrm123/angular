import { Component, EventEmitter, Output, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { Subscribable, Subscription } from "rxjs";
import { User } from "../auth/user.model";
import { map, tap, take } from "rxjs/operators";
import { AppState } from "../store/app-reducer";
import {Store} from '@ngrx/store';
import * as authActions from '../auth/store/auth.actions';
import * as recipesActions from '../recipes/store/recipe.actions';

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
        dummyUser: User = new User("sds","sdsdd","sadsa",null);

        ngOnInit(){
            this.userSub = this.store.select('auth').subscribe( authState => {
                debugger;
                this.user = authState.user;
                this.isAuthenticated = this.user && this.user.email !== "sds";
            });             
        }

        onLogout(){
            // this.authSvc.logout();
            this.store.dispatch(new authActions.SignOut(this.dummyUser))
        }

        ngOnDestroy(){
            this.userSub.unsubscribe();
        }

        onSaveData(){
            this.dataService.storeRecipes();
        }

        onFetchData(){
            this.store.dispatch(new recipesActions.FetchRecipes());
            this.dataService.fetchRecipes();
        }
}