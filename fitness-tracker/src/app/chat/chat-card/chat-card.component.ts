import { Component, OnInit, Input } from '@angular/core';
import { IM } from '../IM.model';
import {trigger, transition, style, animate, state} from "@angular/animations";


@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css'],
  animations: [
    trigger('viewRendered', [
      transition('void => *', [
        style({ opacity: 0.2, transform: 'translateX(-100%)' }),
        animate('1500ms ease-in', style({ opacity: 1, transform: 'scale(1.5)' }))
      ])
  ])
  ]
})
export class ChatCardComponent implements OnInit {

  @Input() userIM: IM = null;
  timeStamp : string = '';
  startView = 'hidden';
  constructor() { }

  ngOnInit() {
 //     this.timeStamp = this.userIM.sentTS
    this.startView = 'shown';
  }

  ngAfterViewInit() {
    
  }

}
