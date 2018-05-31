import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ],
  declarations: [ChatRoomComponent]
})
export class ChatModule { }
