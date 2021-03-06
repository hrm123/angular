import { Component, EventEmitter, Output, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { Subscribable, Subscription } from "rxjs";
import { User } from "../auth/user.model";
import { ModalService } from "../shared/modal/modal.service";


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    constructor(private dataService: DataStorageService,
        private recipeService: RecipeService,
        private authSvc : AuthService,
        private modalService: ModalService) {}

        userSub: Subscription;
        user: User;
        isAuthenticated = false;

        ngOnInit(){
            this.userSub = this.authSvc.user.subscribe( user => {
                this.user = user;
                this.isAuthenticated = !!user
            });             
        }

        onLogout(){
            this.authSvc.logout();
            this.modalService.open('custom-modal-1');
        }

        closeModal(id: string) {
            this.modalService.close(id);
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