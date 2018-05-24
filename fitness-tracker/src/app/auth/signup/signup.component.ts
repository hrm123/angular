import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  maxDate: Date = null;
  minDate: Date = null;
  isLoading = false;
  private loadingSubs : Subscription;

  constructor(private authService : AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 18);
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 110);
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    if(this.loadingSubs) { // TODO: check this at all other places where we have subscription being unsubscribed
      this.loadingSubs.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    this.authService.registeruser({ 
      email: form.value.email,
      password:  form.value.password
    });
    console.log(form);
  }

}
