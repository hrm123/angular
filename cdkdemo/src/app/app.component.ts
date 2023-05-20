import { Component, OnInit, Renderer2 } from '@angular/core';
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

  constructor( private themeService: ThemeServiceService, private renderer: Renderer2) { }


  ngOnInit(){
    this.themeService.isDarkTheme.subscribe(isDark => { 
      this.isDarkTheme = isDark;  
      if(isDark){
        this.renderer.removeClass(document.body, 'light-theme');
        this.renderer.addClass(document.body, 'dark-theme');
      }else{
        this.renderer.removeClass(document.body, 'dark-theme');
        this.renderer.addClass(document.body, 'light-theme');
      }});
  }

}
