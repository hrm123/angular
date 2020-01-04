import { Component } from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from './store';
import * as actions from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @select('counter') count;
  @select(['messageData','newMessages']) newMessages; // messageData.newMessage proeprty in store
  // @select((s : IAppState) => s.messageData.newMessages)

  constructor(private ngRedux: NgRedux<IAppState>){
    
  }

  increment(){
    this.ngRedux.dispatch({type: actions.INCREMENT});
  }
}
