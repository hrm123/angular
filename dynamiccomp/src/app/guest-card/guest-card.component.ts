import { Component } from '@angular/core';
import { ProfileServiceService } from '../profile-service.service';

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.component.html',
  styleUrls: ['./guest-card.component.scss']
})
export class GuestCard {
  constructor(private profileService: ProfileServiceService) {}

  login() {
    this.profileService.login();
  }
}