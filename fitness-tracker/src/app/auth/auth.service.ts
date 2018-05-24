import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {AngularFireAuth} from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;  
    private isAuthenticated = false;;  

    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService : TrainingService  ) { }


    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                this.authChange.next(true);
                this.isAuthenticated = true;
                this.router.navigate(['/training']);
            } else { // no user means logged out
                this.trainingService.cancelSubscriptions();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);        
            }
        });
    }

    registeruser(authData: AuthData) {
        /*
        this.user = {
            email : authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        */
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then((res) => console.log(res))
        .catch(err => console.log(err));
    }

    login(authData: AuthData) {
        /*
        this.user = {
            email : authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        */
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then((res) => console.log(res))
        .catch(err => console.log(err));
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    getUser() {
        return { ...this.user}; // send a clone of user so that others cannot modify this
    }

    isAuth() {
        return this.isAuthenticated;
    }
}