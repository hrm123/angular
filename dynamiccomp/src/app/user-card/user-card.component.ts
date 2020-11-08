import { Component } from '@angular/core';
import { ProfileServiceService } from '../profile-service.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCard {
  constructor(private profileService: ProfileServiceService) {}

  logout() {
    this.profileService.logout();
  }
}