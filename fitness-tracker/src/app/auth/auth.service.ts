import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {AngularFireAuth} from 'angularfire2/auth';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;  
    private isAuthenticated = false;;  

    constructor(private router: Router, private afAuth: AngularFireAuth,
        private uiService: UIService  ) { }


    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                this.authChange.next(true);
                this.isAuthenticated = true;
                // console.log('fbUser', user.uid);
                this.user = { email : user.email , userId : user.uid};
                // this.user = user;
                this.router.navigate(['/training']);
            } else { // no user means logged out
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.user = null;
                this.router.navigate(['/login']);        
            }
        });
    }

    registeruser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then((res) => {
            this.uiService.loadingStateChanged.next(false);
        })
        .catch((err) => {
            this.uiService.showSnackBar(err.message, null, 3000);
            this.uiService.loadingStateChanged.next(false);
        });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);

        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then((res) => {
            this.uiService.loadingStateChanged.next(false);
        })
        .catch(err => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar(err.message, null, 3000);
        });
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