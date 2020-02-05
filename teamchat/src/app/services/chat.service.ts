import { Injectable } from '@angular/core';
// import {AngularFireDatabase, FirebaseListObservable}   from '@angular/fire/database-deprecated';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import { ChatMessage } from '../models/chat-message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages: AngularFireList<any>;
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

  getMessages() : Observable<any>{
    //query to create out message feed binding
    this.chatMessages  = this.db.list('messages');
    return this.chatMessages.valueChanges();

  }

  sendMessage(msg: string){
    const timeSent = this.getTimeStamp();
    const email = ( this.user && this.user.email) || "a@1.com";
    
    /*
    $key?: string;
    email? : string;
    userName? : string;
    message? : string;
    timeSent? : Date = new Date();
    */

    this.chatMessages.push({
      message: msg,
      timeSent,
      userName : this.userName || "ab",
      email
    });
    
    console.log('called send message');
  }
}
