import { Component, OnInit, Input } from '@angular/core';
import { IM } from '../IM.model';


@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css']
})
export class ChatCardComponent implements OnInit {

  @Input() userIM: IM = null;
  timeStamp : string = '';
  constructor() { }

  ngOnInit() {
 //     this.timeStamp = this.userIM.sentTS
  }

}
