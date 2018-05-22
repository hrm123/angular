import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  maxDate: Date = null;
  minDate: Date = null;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 18);
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 110);
  }

  onSubmit(form: NgForm) {
    this.authService.registeruser({ 
      email: form.value.email,
      password:  form.value.password
    });
    console.log(form);
  }

}
