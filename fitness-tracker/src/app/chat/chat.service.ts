import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import { Subscription, Subject } from 'rxjs';
import { IM } from './IM.model';
import { UIService } from '../shared/ui.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ChatService {

  private imSubs : Subscription[] = [];
  imsChanged = new Subject<IM[]>();
  private prevIms : IM[] = []; 

  constructor(private db: AngularFirestore, private uiService : UIService, 
      private authService: AuthService) { }

      fetchExercises() {
        this.uiService.loadingStateChanged.next(true);
        this.db.collection("messages")
        .ref
        .orderBy("sentTS","desc")
        .limit(500);

        this.imSubs.push(this.db.collection('messages', ref => 
        ref.orderBy("sentTS","desc")
        .limit(500))
        .valueChanges()
        .subscribe((messages: IM[]) => {
            this.prevIms = messages;
            this.imsChanged.next(messages);
        }));
      
    }


    sendIM(message : IM) {
      this.db.collection('messages').add(message);
    }


}
