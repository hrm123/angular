import { Component } from '@angular/core';
import { SnackbarService } from './snackbar/snackbar.service';

@Component({
  selector: 'app-sb',
  templateUrl: './sb.component.html',
  styleUrls: ['./sb.component.scss'],
})
export class SbComponent {
  title = 'cdkdemo';
  private count = 1;
  
  constructor(private toastService: SnackbarService) { }

  showToast() {
    this.toastService.openSnackbar(`Toast message ${this.count}`
    );

    this.count += 1;
  }
}
