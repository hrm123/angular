import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'inputwrapper',
  templateUrl: './inputwrapper.component.html',
  styleUrls: ['./inputwrapper.component.css']
})

export class InputwrapperComponent implements OnInit {

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

