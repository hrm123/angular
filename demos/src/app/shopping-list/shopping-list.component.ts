import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';
import { Subject, Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import * as  fromShoppingList from './store/shopping-list-reducer';
import * as shoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Observable<{ ingredients : Ingredient[]}>;
  

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList'); // async pipe clears the subscription
    /*
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientschanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    */
  }

  onIngredientAdded(ingredient: Ingredient){

    // this.ingredients.push(ingredient);
  }

  onEditItem(i : number){
    // this.slService.startedEditing.next(i);
    debugger;
    this.store.dispatch(new shoppingListActions.StartIngredientEditAction(i));

  }

}
