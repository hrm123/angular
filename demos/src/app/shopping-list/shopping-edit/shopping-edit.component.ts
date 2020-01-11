import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from 'src/app/store/app-reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) slForm: NgForm;
  subs : Subscription;
  editMode = false;

  editedItem : Ingredient;
  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    /*
    this.subs = this.slService.startedEditing.subscribe((index:number) =>{
      this.editMode = true;

      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({"name": this.editedItem.name, "amount": this.editedItem.amount})
    }); */
    
   this.store.select('shoppingList').subscribe(stateData => {

     if(stateData.editedIngredientIndex > -1){
      this.editMode = true;
      this.editedItem = stateData.editedIngredient;
      this.slForm.setValue({"name": this.editedItem.name, "amount": this.editedItem.amount})
     } else {
       this.editMode = false;
     }
   });
  }


  onSubmitForm(form: NgForm){
    const ingName = form.value.name;
    const ingAmount = form.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredientAction({
      ingredient: newIngredient}));
      // this.slService.updateIngredients(this.editedItemIndex, newIngredient);
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredientAction(newIngredient));
      // this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredientAction());
    // this.slService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopIngredientEditAction());
  }



  ngOnDestroy(){
    // this.subs.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopIngredientEditAction());
  }

}
