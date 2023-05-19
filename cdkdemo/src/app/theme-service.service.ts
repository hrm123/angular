import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {

  constructor() { }

  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();
  setDarkTheme(isDarkTheme: boolean): void {
    console.log({isDarkTheme})
    this._darkTheme.next(isDarkTheme);
  }
}
