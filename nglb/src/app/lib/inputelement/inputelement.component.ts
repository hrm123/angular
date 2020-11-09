
import { Component, OnInit, Input, ContentChild, AfterContentInit, HostBinding } from '@angular/core';
import { InputRefDirective } from '../common/input-ref.directive';

@Component({
  selector: 'inputelement',
  templateUrl: './inputelement.component.html',
  styleUrls: ['./inputelement.component.css']
})

export class InputelementComponent implements AfterContentInit {

  @Input()
  icon: string;

  @Input()
  placeholder: string = '';


  @ContentChild(InputRefDirective, {static: false})
  input: InputRefDirective;

  ngAfterContentInit(){
    if(!this.input){
      console.error('<input /> should placed within <inputElement />');
    }
  }


  @HostBinding('class.input-focus')
  get isInputFocus() {
    return this.input ? this.input.focus : false;
  }

  constructor() { }

  get classes(){
    const cssClasses = {
      'fa': true

    }

    if(this.icon){
      cssClasses['fa-' + this.icon] = true;
    }
    return cssClasses;
  }

  

  ngOnInit() {
  }

}


