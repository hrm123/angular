import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();

  isAuth : boolean = false;
  authSubscription: Subscription;


  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

}
