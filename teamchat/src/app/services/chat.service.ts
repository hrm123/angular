import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable}
  from '@angular/fire/database-deprecated';
import {AngularFireAuth} from '@angular/fire/auth';
import { ChatMessage } from '../models/chat-message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages: FirebaseListObservable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;


  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { 

    /*
    this.afAuth.authState.subscribe(auth => {
      if(auth !== undefined && auth !== null){
        this.user = auth;
      }
    })
    */
  }
  getTimeStamp(){
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
            now.getUTCMonth() + '/' +
            now.getUTCDate();
    const time = now.getUTCHours() + ':' +
              now.getUTCMinutes() + ':' +
              now.getUTCSeconds() + ':'
              now.getUTCMilliseconds() + ':' ;
    return (date + 'T' + time + 'Z');
  }

  getMessages() : FirebaseListObservable<ChatMessage[]>{
    //query to create out message feed binding
    return this.db.list('messages',{
      query: {
        limitToLast: 25,
        orderByKey: true
      }
    });

  }

  sendMessage(msg: string){
    const timeSent = this.getTimeStamp();
    const email = ( this.user && this.user.email) || "a@1.com";
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent,
      userName : this.userName || "ab",
      email
    });
    console.log('called send message');
  }
}
