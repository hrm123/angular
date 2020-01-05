import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) slForm: NgForm;
  subs : Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem : Ingredient;
  constructor(private slService : ShoppingListService) { }

  ngOnInit() {
    this.subs = this.slService.startedEditing.subscribe((index:number) =>{
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({"name": this.editedItem.name, "amount": this.editedItem.amount})
    });
  }


  onSubmitForm(form: NgForm){
    const ingName = form.value.name;
    const ingAmount = form.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if(this.editMode){
      this.slService.updateIngredients(this.editedItemIndex, newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.slService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }



  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
