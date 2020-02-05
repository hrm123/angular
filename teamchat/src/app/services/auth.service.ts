import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as fb from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : Observable<fb.User>;
  private authState : any;
  // usr : User;
  
  constructor(private router: Router,
    private afAuth : AngularFireAuth,
    private db: AngularFireDatabase
    ) { 
      this.user = afAuth.authState;
    }

  get currentUserId() : string {
    return this.authState !== null ?  this.authState.uid : '';
  }

  setUserData(email: string, displayName: string, status: string) : void{
    const path = `users\${this.currentUserId}`;

    if(this.authState.uid === null){
      return;
    }
    const data = {
      email,
      displayName,
      status
    };

    this.db.object(path).update(data)
      .catch(err => console.log(err));
  }

  setUserStatus(status: string) : void{
    const path = `users\${this.currentUserId}`;

    if(this.authState.uid === null){
      return;
    }
    const data = {
      status
    };

    this.db.object(path).update(data)
      .catch(err => console.log(err));
  }

  signUp(email: string,password : string, displayName : string){

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          const status = 'online';
          this.setUserData(email, displayName, status);
        }).catch(err => console.log(err));

  }

  signOn(email: string,password : string){

    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((resolve) => {
          const status = 'online';
          this.setUserStatus(status);
          this.router.navigate(['chat']);
        }).catch(err => console.log(err));

  }
}
