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

    authUser(){
      return this.user;
    }

  get currentUserId() : string {
    debugger;
    return (this.authState !== null && this.authState.user !== null)    ?  this.authState.user.uid : '';
  }

  setUserData(email: string, displayName: string, status: string) : void{
    debugger;
    const path = `users/${this.currentUserId}`;

    if(this.authState.user.uid === null){
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

  removeSpecialChars(email : string): string{
    return email.replace('.','dot')
        .replace('#','hash')
        .replace('$','dollar')
        .replace('[','boxstart')
        .replace(']','boxfinish');
  }

  signUp(email: string,password : string, displayName : string){
    const validEmail = this.removeSpecialChars(email);
    debugger;
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          debugger;
          this.authState = user;
          const status = 'online';
          this.setUserData(validEmail, displayName, status);
        }).catch(err => console.log(err));


    

  }

  
  signout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
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
