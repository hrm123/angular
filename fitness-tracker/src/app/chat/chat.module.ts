import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from "../shared/shared.module";
import { ChatCardComponent } from './chat-card/chat-card.component';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ],
  declarations: [ChatRoomComponent, ChatCardComponent, TimeAgoPipe]
})
export class ChatModule { }
