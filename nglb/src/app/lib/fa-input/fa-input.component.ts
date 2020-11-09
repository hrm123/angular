import { Component, OnInit, Input } from '@angular/core';

/*

Not a good design since basic html elements when wrapped have issues when for example
to make them use in angular react tive form etc.
Use content projection - where <input  /> is child element of  this element
*/

@Component({
  selector: 'fa-input',
  templateUrl: './fa-input.component.html',
  styleUrls: ['./fa-input.component.scss']
})
export class FaInputComponent implements OnInit {

  @Input()
  icon: string;

  @Input()
  placeholder: string = '';

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
