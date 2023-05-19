import { Component, OnInit } from '@angular/core';
import { SnackbarService } from './sb/snackbar/snackbar.service';
import { Observable } from 'rxjs';
import { ThemeServiceService } from './theme-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cdkdemo';
  isDarkTheme: boolean = true;

  constructor( private themeService: ThemeServiceService,) { }


  ngOnInit(){
    this.themeService.isDarkTheme.subscribe(isDark => { this.isDarkTheme = isDark; });
  }

}
