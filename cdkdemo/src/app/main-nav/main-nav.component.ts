import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThemeServiceService } from '../theme-service.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  isDarkTheme: boolean = true;


  ngOnInit(){
     this.themeService.isDarkTheme.subscribe(theme =>  this.isDarkTheme = theme);
  }

  constructor( private themeService: ThemeServiceService,) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    toggleDarkTheme() {
      this.themeService.setDarkTheme(!this.isDarkTheme);
    }
}
