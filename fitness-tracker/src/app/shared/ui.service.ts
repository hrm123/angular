import {Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class UIService {

    constructor(private snackbar : MatSnackBar) {}

    loadingStateChanged = new Subject<boolean>();
    trainingsLoaded = new Subject<boolean>();

    showSnackBar(msg, action, duration) {
        this.snackbar.open(msg, action, { duration })
    }
}