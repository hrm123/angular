import { Component } from '@angular/core';
import { SnackbarService } from './sb/snackbar/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cdkdemo';
  private count = 1;
  
  constructor(private toastService: SnackbarService) { }

  showToast() {
    this.toastService.openSnackbar(`Toast message ${this.count}`
    );

    this.count += 1;
  }

}
