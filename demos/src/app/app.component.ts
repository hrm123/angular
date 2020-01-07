import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { enterLeaveAnimation } from './animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    enterLeaveAnimation
  ]
})
export class AppComponent implements OnInit{

constructor(private authSvc: AuthService ) {}

  loadedFeature: string = 'recipe';

  ngOnInit(){
    this.authSvc.autoLogin();
  }

  prepareRoute(outlet: RouterOutlet) {
    debugger;
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  
  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
